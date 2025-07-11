import React, { useEffect, useRef, useState } from 'react';
import { db, doc, getDoc, updateDoc } from '../components/firebase';

const BASE_WIDTH = 600;
const BASE_HEIGHT = 800;

const StopForAGame = () => {
  const canvasRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const previewFrameRef = useRef(null);
  const [previewBirdY, setPreviewBirdY] = useState(60);
  const previewDirectionRef = useRef(1);

  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [highScore, setHighScore] = useState(0);
  const [highScoreHolder, setHighScoreHolder] = useState('');
  const scoreRef = useRef(0);
  const frameRef = useRef(null);

  const birdRef = useRef({
    x: 50,
    y: 200,
    width: 60,
    height: 56,
    gravity: 0.2,
    lift: -5,
    velocity: 0,
  });

  const pipes = useRef([]);
  const pipeWidth = 80;
  const pipeGap = 200;
  const pipeSpeed = 2;

  const [sndJump] = useState(() => new Audio('/sounds/jump.mp3'));
  const [sndScore] = useState(() => new Audio('/sounds/point.mp3'));
  const [sndGameOver] = useState(() => new Audio('/sounds/gameover.mp3'));

  // Bird image load & ready state
  const birdImageRef = useRef(null);
  const [birdLoaded, setBirdLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/assets/bird.png'; // Your bird image path here
    img.onload = () => {
      birdImageRef.current = img;
      setBirdLoaded(true);
    };
  }, []);

  const handleResize = () => {
    const canvas = canvasRef.current;
    const parentWidth = window.innerWidth;
    const parentHeight = window.innerHeight * 0.8;

    const scaleX = parentWidth / BASE_WIDTH;
    const scaleY = parentHeight / BASE_HEIGHT;
    const scale = Math.min(scaleX, scaleY);

    canvas.width = BASE_WIDTH;
    canvas.height = BASE_HEIGHT;
    canvas.style.width = `${BASE_WIDTH * scale}px`;
    canvas.style.height = `${BASE_HEIGHT * scale}px`;
  };

  const resetGame = () => {
    scoreRef.current = 0;
    pipes.current = [];
    birdRef.current.y = 200;
    birdRef.current.velocity = 0;
    setIsGameOver(false);
    setIsNewHighScore(false);
    setPlayerName('');
    setIsGameRunning(true);

    if (canvasRef.current) canvasRef.current.focus();

    setTimeout(() => {
      gameLoop();
    }, 0);
  };

  const handleJump = () => {
    if (!isGameRunning || isGameOver) return;
    birdRef.current.velocity = birdRef.current.lift;
    sndJump.currentTime = 0;
    sndJump.play();
  };

  // Draw bird image with scale and blend mode
  const drawBird = (ctx, bird, scale = 1) => {
    if (birdLoaded && birdImageRef.current) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(
        birdImageRef.current,
        bird.x,
        bird.y,
        bird.width * scale,
        bird.height * scale
      );
    } else {
      ctx.fillStyle = 'yellow';
      ctx.fillRect(bird.x, bird.y, bird.width * scale, bird.height * scale);
    }
  };

  const drawPipes = (ctx, canvasHeight) => {
    pipes.current.forEach((pipe) => {
      const gradient = ctx.createLinearGradient(pipe.x, 0, pipe.x + pipeWidth, 0);
      gradient.addColorStop(0, 'green');
      gradient.addColorStop(0.5, 'lightgreen');
      gradient.addColorStop(1, 'green');
      ctx.fillStyle = gradient;

      ctx.fillRect(pipe.x, 0, pipeWidth, pipe.y);
      ctx.fillRect(pipe.x, pipe.y + pipeGap, pipeWidth, canvasHeight - pipe.y - pipeGap);

      const edgeHeight = 10;
      const edgeWidth = pipeWidth + 10;
      const edgeX = pipe.x - 5;
      const edgeGradient = ctx.createLinearGradient(edgeX, 0, edgeX + edgeWidth, 0);
      edgeGradient.addColorStop(0, '#004d00');
      edgeGradient.addColorStop(0.5, '#99ff99');
      edgeGradient.addColorStop(1, '#004d00');

      ctx.fillStyle = edgeGradient;
      ctx.fillRect(edgeX, pipe.y - edgeHeight, edgeWidth, edgeHeight);
      ctx.fillRect(edgeX, pipe.y + pipeGap, edgeWidth, edgeHeight);

      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fillRect(pipe.x, pipe.y, pipeWidth, 4);
      ctx.fillRect(pipe.x, pipe.y + pipeGap + edgeHeight, pipeWidth, 4);
    });
  };

  const gameLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const bird = birdRef.current;
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (bird.y + bird.height > canvas.height || bird.y < 0) {
      endGame();
      return;
    }

    if (
      pipes.current.length === 0 ||
      pipes.current[pipes.current.length - 1].x < canvas.width - 300
    ) {
      const pipeHeight = Math.random() * (canvas.height - pipeGap - 100) + 50;
      pipes.current.push({ x: canvas.width, y: pipeHeight });
    }

    pipes.current.forEach((pipe, index) => {
      pipe.x -= pipeSpeed;

      if (pipe.x + pipeWidth < 0) {
        pipes.current.splice(index, 1);
        scoreRef.current++;
        sndScore.currentTime = 0;
        sndScore.play();
      }

      if (
        pipe.x < bird.x + bird.width &&
        pipe.x + pipeWidth > bird.x &&
        (bird.y < pipe.y || bird.y + bird.height > pipe.y + pipeGap)
      ) {
        endGame();
      }
    });

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawBird(ctx, bird); // Draw bird in game

    drawPipes(ctx, canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = "18px 'Press Start 2P'";
    ctx.fillText(`SCORE: ${scoreRef.current}`, 20, 50);
    ctx.fillStyle = 'orange';
    ctx.font = "14px 'Press Start 2P'";
    ctx.fillText(`HIGHSCORE: ${highScore}`, 20, 80);

    frameRef.current = requestAnimationFrame(gameLoop);
  };

  const endGame = () => {
    cancelAnimationFrame(frameRef.current);
    setIsGameRunning(false);
    setIsGameOver(true);
    sndGameOver.play();
    if (scoreRef.current > highScore) {
      setIsNewHighScore(true);
    }
  };

  const submitHighScore = async () => {
    if (!playerName) return;
    const ref = doc(db, 'highscores', 'globalHighScore');
    await updateDoc(ref, {
      name: playerName,
      score: scoreRef.current,
    });
    setHighScore(scoreRef.current);
    setHighScoreHolder(playerName);
    setIsNewHighScore(false);
  };

  const fetchHighScore = async () => {
    const ref = doc(db, 'highscores', 'globalHighScore');
    const snap = await getDoc(ref);
    if (snap.exists()) {
      setHighScore(snap.data().score);
      setHighScoreHolder(snap.data().name);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    fetchHighScore();

    const handleKeyDown = (e) => {
      if ((e.key === ' ' || e.code === 'Space') && !isGameOver && isGameRunning) {
        e.preventDefault();
        handleJump();
      }
    };

    const handleClick = (e) => {
      if (!isGameOver && isGameRunning) {
        e.preventDefault();
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
    };
  }, [isGameRunning, isGameOver]);

  // Preview animation effect
  useEffect(() => {
    if (!previewCanvasRef.current || !birdLoaded) return;

    const ctx = previewCanvasRef.current.getContext('2d');
    let animationFrameId;

    const animate = () => {
      setPreviewBirdY(prevY => {
        let newY = prevY + previewDirectionRef.current * 0.5;
        if (newY > 80 || newY < 50) {
          previewDirectionRef.current *= -1;
          newY = prevY + previewDirectionRef.current * 0.5;
        }
        return newY;
      });

      ctx.clearRect(0, 0, 160, 160);

      const bird = {
        x: (160 - 120) / 2,
        y: previewBirdY- 25,
        width: 120,
        height: 112,
      };

      drawBird(ctx, bird);

      animationFrameId = requestAnimationFrame(animate);
    };

    if (!isGameRunning && !isGameOver) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isGameRunning, isGameOver, previewBirdY, birdLoaded]);

  return (
    <div style={styles.container}>
      <canvas ref={canvasRef} style={styles.canvas} tabIndex={0} />

      {!isGameRunning && !isGameOver && (
        <div style={styles.previewContainer}>
          <canvas
            ref={previewCanvasRef}
            width={160}
            height={160}
            style={styles.previewCanvas}
          />
          <button onClick={resetGame} style={styles.startBtn}>START GAME</button>
        </div>
      )}

      {isGameOver && (
        <div style={styles.overlay}>
          <div style={styles.card}>
            <div style={styles.icon}>💀</div>
            <div style={styles.title}>GAME OVER</div>
            <div style={styles.scoreBox}>
              <span>YOUR SCORE: </span>
              <span>{scoreRef.current}</span>
            </div>
            <div style={{ ...styles.scoreBox, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <p>
                {isNewHighScore ? 'CURRENT HIGHSCORE' : 'HIGHSCORE'}
              </p>
              <p style={{ marginTop: '10px', color: 'orange', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <span style={{ display: 'flex', justifyContent: 'center', alignItems:'center', }}>🏆</span>
                <span style={{color: 'orange'}}>{highScoreHolder.toUpperCase()} : {highScore}</span>
              </p>
            </div>
            {isNewHighScore ? (
              <>
                <div style={{ color: '#0f0', fontWeight: 'bold' }}>
                  YOU BEAT THE HIGH SCORE!
                </div>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
                  placeholder="ENTER NAME"
                  style={styles.input}
                />
                <button onClick={submitHighScore} style={styles.submitBtn}>SUBMIT</button>
              </>
            ) : (
              <button onClick={resetGame} style={styles.restartBtn}>PLAY AGAIN</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    background: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100dvh - 90px - 80px)',
    position: 'relative',
    overflow: 'hidden',
  },
  canvas: {
    display: 'block',
    imageRendering: 'pixelated',
    background: 'black',
    outline: 'none',
  },
  previewContainer: {
    position: 'absolute',
    top: '18%',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 5,
  },
  previewCanvas: {
    imageRendering: 'pixelated',
    backgroundColor: 'black',
    marginBottom: 40,
    width: '160px',
    height: '160px',
  },
  startBtn: {
    padding: '12px 24px',
    fontFamily: "'Press Start 2P'",
    backgroundColor: '#0f0',
    color: 'black',
    border: 'ridge 3px white',
    borderRadius: 6,
    cursor: 'pointer',
    zIndex: 5,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(0, 0, 0)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    fontFamily: "'Press Start 2P'",
  },
  card: {
    background: '#000000',
    border: '4px solid rgba(0, 136, 43, 0.46)',
    padding: 20,
    borderRadius: 12,
    textAlign: 'center',
    color: 'white',
    width: '80%',
    maxWidth: 400,
  },
  icon: {
    fontSize: '2rem',
    marginBottom: 10,
  },
  title: {
    fontSize: '1rem',
    marginBottom: 20,
  },
  scoreBox: {
    marginBottom: 10,
    fontSize: '0.75rem',
  },
  input: {
    marginTop: 10,
    padding: '10px',
    fontSize: '0.75rem',
    width: '100%',
    borderRadius: 6,
    border: 'none',
    textAlign: 'center',
  },
  submitBtn: {
    marginTop: '10px',
    padding: '10px 20px',
    fontSize: '0.75rem',
    fontFamily: "'Press Start 2P'",
    backgroundColor: '#0f0',
    color: 'black',
    border: 'ridge 3px white',
    borderRadius: 6,
    cursor: 'pointer',
  },
  restartBtn: {
    marginTop: 20,
    padding: '10px 20px',
    fontSize: '0.75rem',
    fontFamily: "'Press Start 2P'",
    backgroundColor: '#0f0',
    color: 'black',
    border: 'ridge 3px white',
    borderRadius: 6,
    cursor: 'pointer',
  },
};

export default StopForAGame;
