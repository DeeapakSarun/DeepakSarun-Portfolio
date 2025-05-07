import React, { useEffect, useRef, useState } from 'react';

const StopForAGame = () => {
  const canvasRef = useRef(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameRunning, setIsGameRunning] = useState(true);
  const scoreRef = useRef(0);
  const frameRef = useRef(null);

  const bird = {
    x: 50,
    y: 200,
    width: 30,
    height: 25,
    gravity: 0.2,
    lift: -5,
    velocity: 0,
  };

  const pipes = [];
  const pipeWidth = 50;
  const pipeGap = 200;
  const pipeSpeed = 2;

  const handleResize = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.7;
  };

  const resetGame = () => {
    scoreRef.current = 0;
    pipes.length = 0;
    bird.y = 200;
    bird.velocity = 0;
    setIsGameOver(false);
    setIsGameRunning(true);
    gameLoop();
  };

  const handleJump = () => {
    if (isGameOver || !isGameRunning) {
      resetGame();
    } else {
      bird.velocity = bird.lift;
    }
  };

  const gameLoop = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update bird position
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // Check for floor/ceiling collision
    if (bird.y + bird.height > canvas.height || bird.y < 0) {
      endGame();
      return;
    }

    // Generate new pipe
    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 300) {
      const pipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap));
      pipes.push({ x: canvas.width, y: pipeHeight });
    }

    // Move pipes and detect collision
    pipes.forEach((pipe, index) => {
      pipe.x -= pipeSpeed;

      if (pipe.x + pipeWidth < 0) {
        pipes.splice(index, 1);
        scoreRef.current++;
      }

      if (
        pipe.x < bird.x + bird.width &&
        pipe.x + pipeWidth > bird.x &&
        (bird.y < pipe.y || bird.y + bird.height > pipe.y + pipeGap)
      ) {
        endGame();
      }
    });

    // Draw background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw pixel-art bird
    drawBird(ctx);

    pipes.forEach(pipe => {
      // === PIPE BODY WITH GRADIENT ===
      const pipeGradient = ctx.createLinearGradient(pipe.x, 0, pipe.x + pipeWidth, 0);
      pipeGradient.addColorStop(0, 'green');
      pipeGradient.addColorStop(0.5, 'lightgreen');
      pipeGradient.addColorStop(1, 'green');
      ctx.fillStyle = pipeGradient;
    
      // Draw top pipe
      ctx.fillRect(pipe.x, 0, pipeWidth, pipe.y);
    
      // Draw bottom pipe
      ctx.fillRect(pipe.x, pipe.y + pipeGap, pipeWidth, canvas.height - pipe.y - pipeGap);
    
      // === OPENING EDGE RECTANGLES WITH GRADIENT ===
      const edgeHeight = 10;
      const edgeWidth = pipeWidth + 10;
      const edgeX = pipe.x - 5;
    
      const edgeGradient = ctx.createLinearGradient(edgeX, 0, edgeX + edgeWidth, 0);
      edgeGradient.addColorStop(0, '#004d00');
      edgeGradient.addColorStop(0.5, '#99ff99');
      edgeGradient.addColorStop(1, '#004d00');
      ctx.fillStyle = edgeGradient;
    
      // Bottom edge of top pipe
      ctx.fillRect(edgeX, pipe.y - edgeHeight, edgeWidth, edgeHeight);
    
      // Top edge of bottom pipe
      ctx.fillRect(edgeX, pipe.y + pipeGap, edgeWidth, edgeHeight);
    
      // === SHADOW BELOW THE OPENING EDGE ===
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    
      // Shadow for bottom of top pipe
      ctx.fillRect(pipe.x, pipe.y, pipeWidth, 4);
    
      // Shadow for top of bottom pipe
      ctx.fillRect(pipe.x, pipe.y + pipeGap + edgeHeight, pipeWidth, 4);
    });
    

    // Draw score
    ctx.fillStyle = 'white';
    ctx.font = '20px Impact';
    ctx.fillText(`Score: ${scoreRef.current}`, 10, 30);

    frameRef.current = requestAnimationFrame(gameLoop);
  };

  const drawBird = (ctx) => {
    // Main Body - Yellow
    ctx.fillStyle = 'yellow';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
  
    // Eye - White (move to the right side)
    ctx.fillStyle = 'white';
    ctx.fillRect(bird.x + bird.width - 15, bird.y + 5, 10, 10);
  
    // Eye - Black (center of the white eye)
    ctx.fillStyle = 'black';
    ctx.fillRect(bird.x + bird.width - 9, bird.y + 7, 3, 3);
  
    // Beak - Orange (pointing right)
    ctx.fillStyle = 'orange';
    ctx.fillRect(bird.x + bird.width-5, bird.y + 7, 10, 5);
  
    // Tail - yellow (left end of the bird)
    ctx.fillStyle = 'yellow';
    ctx.fillRect(bird.x - 8, bird.y + 15, 10, 5);
  };
  

  const endGame = () => {
    setIsGameOver(true);
    setIsGameRunning(false);
    cancelAnimationFrame(frameRef.current);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    if (isGameRunning) {
      gameLoop();
    }

    const onKeyPress = (e) => {
      if (e.key === ' ' || e.key === 'Spacebar') handleJump();
    };

    window.addEventListener('keydown', onKeyPress);
    window.addEventListener('click', handleJump);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', onKeyPress);
      window.removeEventListener('click', handleJump);
    };
  }, [isGameRunning]);

  return (
    <div style={styles.container}>
      <canvas ref={canvasRef} style={styles.canvas} />
      {isGameOver && (
        <div style={styles.gameOverOverlay}>
          <div style={styles.textBig}>Game Over!</div>
          <div style={styles.textSmall}>Your Score: {scoreRef.current}</div>
          <div style={styles.textHint}>Click or Press Spacebar to Restart</div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  canvas: {
    width: '100%',
    height: '100%',
    display: 'block',
  },
  gameOverOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '80%',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid white',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgb(0, 0, 0)',
    padding: '30px',
    borderRadius: '10px',
    textAlign: 'center',
  },
  textBig: {
    fontSize: 'calc(10px + 4vw)',
    color: 'red',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  textSmall: {
    fontSize: 'calc(10px + 2vw)',
    color: 'white',
    marginBottom: '10px',
  },
  textHint: {
    fontSize: 'calc(10px + 1vw)',
    color: '#ccc',
    fontStyle: 'italic',
  },
};

export default StopForAGame;
