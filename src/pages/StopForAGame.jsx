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
    width: window.innerWidth > 600 ? 90 : 30,
    height: window.innerWidth > 600 ? 40 : 25,
    gravity: 0.2,
    lift: -5,
    velocity: 0,
  };

  const pipes = [];
  const pipeWidth = window.innerWidth > 600 ? 150 : 50;
  const pipeGap = window.innerWidth > 600 ? 200 : 150;
  const pipeSpeed = window.innerWidth > 600 ? 3 : 1;

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
    if (pipes.length === 0 || pipes[pipes.length - 1].x < (canvas.width - (window.innerWidth > 600 ? 1000 : 300))) {
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
      const edgeHeight = (window.innerWidth > 600 ? 20 : 10);
      const edgeWidth = pipeWidth + (window.innerWidth > 600 ? 30 : 10);
      const edgeX = pipe.x - (window.innerWidth > 600 ? 15 : 5);
    
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
    ctx.fontWeight = 'bold';
    ctx.font = 'calc(10px + 1vw + 1vh*0.5) poppins';
    ctx.fillText(`Score: ${scoreRef.current}`, (window.innerWidth > 600 ? 40 : 20), 50);

    frameRef.current = requestAnimationFrame(gameLoop);
  };

  const drawBird = (ctx) => {
    // Main Body - Yellow
    ctx.fillStyle = 'yellow';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
  
    // Eye - White (move to the right side)
    ctx.fillStyle = 'white';
    ctx.fillRect(bird.x + bird.width - (window.innerWidth > 600 ? 35 : 15), bird.y + 5, window.innerWidth > 600 ? 20 : 10, window.innerWidth > 600 ? 10 : 10);
  
    // Eye - Black (center of the white eye)
    ctx.fillStyle = 'black';
    ctx.fillRect(bird.x + bird.width - (window.innerWidth > 600 ? 22 : 9), bird.y + 7, window.innerWidth > 600 ? 6 : 3, window.innerWidth > 600 ? 6 : 3);
  
    // Beak - Orange (pointing right)
    ctx.fillStyle = 'orange';
    ctx.fillRect(bird.x + bird.width - (window.innerWidth > 600 ? 10 : 5) , bird.y + (window.innerWidth > 600 ? 12 : 9), window.innerWidth > 600 ? 40 : 12, window.innerWidth > 600 ? 10 : 5);
  
    // Tail - yellow (left end of the bird)
    ctx.fillStyle = 'yellow';
    ctx.fillRect( (bird.x - (window.innerWidth > 600 ? 20 : 8)), bird.y + (window.innerWidth > 600 ? 25 : 15), window.innerWidth > 600 ? 20 : 20, window.innerWidth > 600 ? 10 : 5);
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
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '80dvh',
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
