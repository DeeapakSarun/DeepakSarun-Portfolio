import React, { useEffect, useRef, useState } from 'react';
import { RxFontStyle } from 'react-icons/rx';

const StopForAGame = () => {
    const canvasRef = useRef(null);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameRunning, setIsGameRunning] = useState(true); // To manage if the game is running or not

    // Using ref for score to persist value during the game loop
    const scoreRef = useRef(0);

    const bird = {
        x: 50,
        y: 200,
        width: 30,
        height: 30,
        gravity: 0.2,
        lift: -5,
        velocity: 0
    };

    const pipes = [];
    const pipeWidth = 50;
    const pipeGap = 200;
    const pipeSpeed = 2;
    let frameId = null;

    const gameLoop = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // Bird mechanics
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;

        // Game over condition
        if (bird.y + bird.height > canvasRef.current.height || bird.y < 0) {
            setIsGameOver(true);
            setIsGameRunning(false); // Stop the game
            cancelAnimationFrame(frameId);
            return;
        }

        // Create pipes
        if (pipes.length === 0 || pipes[pipes.length - 1].x < canvasRef.current.width - 300) {
            const pipeHeight = Math.floor(Math.random() * (canvasRef.current.height - pipeGap));
            pipes.push({ x: canvasRef.current.width, y: pipeHeight });
        }

        // Move pipes and detect collision
        pipes.forEach((pipe, index) => {
            pipe.x -= pipeSpeed;

            if (pipe.x + pipeWidth < 0) {
                pipes.splice(index, 1);
                // Increment score when pipe moves out of the screen
                scoreRef.current++; // Update score ref directly
            }

            if (pipe.x < bird.x + bird.width &&
                pipe.x + pipeWidth > bird.x &&
                (bird.y < pipe.y || bird.y + bird.height > pipe.y + pipeGap)) {
                setIsGameOver(true);
                setIsGameRunning(false); // Stop the game
                cancelAnimationFrame(frameId);
            }
        });

        // Drawing the bird
        ctx.fillStyle = 'yellow';
        ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

        // Drawing pipes
        ctx.fillStyle = 'green';
        pipes.forEach(pipe => {
            ctx.fillRect(pipe.x, 0, pipeWidth, pipe.y); // Top pipe
            ctx.fillRect(pipe.x, pipe.y + pipeGap, pipeWidth, canvasRef.current.height - pipe.y - pipeGap); // Bottom pipe
        });

        // Drawing the score from ref
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.fillText(`Score: ${scoreRef.current}`, 10, 30);

        frameId = requestAnimationFrame(gameLoop);
    };

    const handleJump = () => {
        if (isGameOver || !isGameRunning) {
            resetGame();
        } else {
            bird.velocity = bird.lift; // Make the bird jump
        }
    };

    const resetGame = () => {
        scoreRef.current = 0; // Reset score when the game resets
        pipes.length = 0;
        bird.y = 200;
        bird.velocity = 0;
        setIsGameOver(false);
        setIsGameRunning(true);
        gameLoop(); // Restart the game loop
    };

    const handleResize = () => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.7; // Game height should be 70% of screen height
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);

        // Start the game loop
        if (isGameRunning) {
            gameLoop();
        }

        // Add event listeners for spacebar and click
        const handleKeyPress = (e) => {
            if (e.key === " " || e.key === "Spacebar") {
                handleJump();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('click', handleJump);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('click', handleJump);
        };
    }, [isGameRunning]);

    return (
      <>
        <div style={styles.container}>
          <canvas ref={canvasRef} style={styles.canvas}></canvas>
          {isGameOver && !isGameRunning && (
            <p style={styles.gameOverText}>
              <span style={styles.gamovertext}>Game Over!</span> <span style={styles.score}>Your Score: {scoreRef.current}</span>  <span style={styles.instruction}>Click or Press Spacebar to Restart</span>
            </p>
          )}
        </div>
      </>

    );
};

// Inline styling in JSX
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        width: '100%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#f0f0f0',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
    },
    canvas: {
        backgroundColor: 'black',
        border: '2px solid black',
        height: '100%',
        width: '100%',
        display: 'block',
        margin: '0 auto',
    },
    gameOverText: {
        position: 'absolute',   
        top: '50%',
        left: '50%',
        display: 'flex',
        width: '50%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '10px',
        padding: '20px',
        color: 'white',
        border: '2px solid white',
        flexDirection: 'column',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Arial, sans-serif',

    },
    score: {
        fontSize: 'calc(10px + 1vw)',
        color: 'white',
        marginBottom: '10px',

    },
    instruction: {
        fontSize: 'calc(10px + 0.5vw)',
        fontStyle: 'italic',
        color: 'rgba(255, 255, 255, 0.48)',
    },
    gamovertext: {
        fontSize: 'calc(10px + 4vw)',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: 'red',
    }
};

export default StopForAGame;
