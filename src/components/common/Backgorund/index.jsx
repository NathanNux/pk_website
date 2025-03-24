import { useEffect, useRef } from "react";

export default function BackgroundGradient() {
    const canvasRef = useRef(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            if (window.fluidAnimationId) {
                cancelAnimationFrame(window.fluidAnimationId);
                initFluidAnimation(canvas, ctx);
            }
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        window.fluidAnimationId = initFluidAnimation(canvas, ctx);
        
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (window.fluidAnimationId) {
                cancelAnimationFrame(window.fluidAnimationId);
            }
        };
    }, []);

    return (
        <div className="background">
            <div className="background__gradient">
                <canvas ref={canvasRef} className="background__canvas"></canvas>
            </div>
        </div>
    );
}

function initFluidAnimation(canvas, ctx) {
    const width = canvas.width;
    const height = canvas.height;
    
    // Center point of the canvas
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Create offscreen canvas for better performance
    const metaCanvas = document.createElement('canvas');
    metaCanvas.width = width;
    metaCanvas.height = height;
    const metaCtx = metaCanvas.getContext('2d');

    // Colors
    const groupColors = [
        'rgba(31, 34, 98', // Dark blue (#1F2262)
        'rgba(90, 60, 190',  // Purple
        'rgba(168, 152, 112',  // Darker Beige (#A89870)
    ];
    
    // FPS control
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

    // ULTRA-DYNAMIC MOVEMENT SETTINGS - dramatically increased for maximum canvas coverage
    const movementParams = {
        // Allow blobs to travel far beyond the canvas with no constraints
        maxDist: Math.max(width, height) * 4.0, // Massive travel range
        
        // Almost zero center gravity - complete freedom of movement
        centerGravity: 0.000001, // 10x less than before
        
        // Extreme random movement
        randomMoveProbability: 0.08, // 8% chance per frame (60% increase)
        randomMoveStrength: 1.2, // 70% stronger random impulses
        
        // Very frequent direction changes to ensure dramatic canvas crossing
        directionChangePeriod: 320, // Every ~6 seconds (40% more frequent)
        
        // Extreme wiggle movement
        wiggleSpeed: 0.06, // 50% faster wiggle
        wiggleAmplitude: 0.2 // 100% stronger wiggles
    };
    
    // MASSIVE blobs for maximum visibility
    const blobRadius = 350; // 28% larger blobs
    const interactionDistance = blobRadius * 1.2; // Reduced for more passing through
    const blendFactor = 0.15; // Less resistance to allow more free movement
    
    // Create the blobs with extreme initial conditions
    const blobs = [];
    
    // Track frames for periodic direction changes
    let frameCount = 0;
    
    // Create massive high-velocity blobs
    for (let i = 0; i < 5; i++) { // Fewer, bigger blobs
        // Starting positions across the canvas
        const x = width * (0.2 + Math.random() * 0.6); // Anywhere in middle 60% of screen
        const y = height * (0.2 + Math.random() * 0.6);
        
        // Create blob with appropriate color type
        const colorType = i % 3;
        
        // Extreme initial velocity for dramatic movement
        const speed = 10.0 + Math.random() * 8.0; // ~2x higher initial speeds
        const moveAngle = Math.random() * Math.PI * 2;
        
        blobs.push(new Blob(
            colorType, 
            x, 
            y, 
            Math.cos(moveAngle) * speed,
            Math.sin(moveAngle) * speed
        ));
    }
    
    // Create textures for each color type
    const textures = groupColors.map(color => {
        const texture = document.createElement('canvas');
        texture.width = blobRadius * 2;
        texture.height = blobRadius * 2;
        const nctx = texture.getContext('2d');
        
        const grad = nctx.createRadialGradient(
            blobRadius, blobRadius, 1,
            blobRadius, blobRadius, blobRadius
        );

        grad.addColorStop(0, `${color}, 0.9)`);
        grad.addColorStop(0.65, `${color}, 0.7)`);
        grad.addColorStop(1, `${color}, 0)`);

        nctx.fillStyle = grad;
        nctx.beginPath();
        nctx.arc(blobRadius, blobRadius, blobRadius, 0, Math.PI * 2, true);
        nctx.closePath();
        nctx.fill();

        return texture;
    });

    // Blob class for massive fluid blobs with extreme movement
    function Blob(type, x, y, vx, vy) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.px = x - vx; 
        this.py = y - vy;
        this.vx = vx;
        this.vy = vy;
        this.radius = blobRadius;
        
        // Extreme individual movement pattern factors
        this.timeFactor = 1.2 + Math.random() * 2.0; // 50% faster variations
        this.timeOffset = Math.random() * 1000; 
        this.moveCounter = Math.random() * 100; 
        
        // Even more diverse individual behaviors
        this.individualWiggleFactor = 1.5 + Math.random() * 2.0; // 50% stronger wiggle
        
        // Track when this blob last changed direction
        this.lastDirectionChange = Math.floor(Math.random() * 100);
        
        // Shorter periods between direction changes
        this.directionChangePeriod = 
            movementParams.directionChangePeriod * (0.5 + Math.random() * 0.5);
            
        // Track burst movement cooldown
        this.lastBurst = 0;
        this.burstCooldown = 300 + Math.floor(Math.random() * 200);
    }
    
    // Update blob position with dramatically enhanced canvas-spanning movement
    Blob.prototype.update = function() {
        // Almost zero velocity damping for very persistent movement
        this.vx = (this.x - this.px) * 0.9998; // Nearly no damping
        this.vy = (this.y - this.py) * 0.9998;
        
        // Even more free movement - virtually no center gravity
        const dx = centerX - this.x;
        const dy = centerY - this.y;
        const distSquared = dx * dx + dy * dy;
        const dist = Math.sqrt(distSquared);
        
        // Only apply EXTREMELY minimal center gravity if very far from center
        if (dist > movementParams.maxDist * 0.8) {
            const force = movementParams.centerGravity * 
                Math.pow((dist - movementParams.maxDist * 0.8) / movementParams.maxDist, 2);
            
            this.vx += dx / dist * force;
            this.vy += dy / dist * force;
        }
        
        // Enhanced organic-looking randomness based on time
        this.moveCounter += movementParams.wiggleSpeed * this.timeFactor;
        const wiggle = movementParams.wiggleAmplitude * this.individualWiggleFactor;
        
        // More complex sine-based movement patterns with higher frequency
        this.vx += Math.sin(this.moveCounter + this.timeOffset) * wiggle;
        this.vy += Math.cos(this.moveCounter * 1.5 + this.timeOffset) * wiggle;
        
        // More frequent random direction changes
        if (Math.random() < movementParams.randomMoveProbability) {
            this.vx += (Math.random() - 0.5) * movementParams.randomMoveStrength;
            this.vy += (Math.random() - 0.5) * movementParams.randomMoveStrength;
        }
        
        // Occasional "burst" of movement for dramatic effect
        if (frameCount > this.lastBurst + this.burstCooldown && Math.random() < 0.005) {
            // Massive speed boost in current direction
            const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            const burstFactor = 8.0 + Math.random() * 4.0; // Dramatic acceleration
            
            if (currentSpeed > 0.1) {
                // Boost in current direction
                this.vx = (this.vx / currentSpeed) * burstFactor;
                this.vy = (this.vy / currentSpeed) * burstFactor;
            } else {
                // Random direction if barely moving
                const angle = Math.random() * Math.PI * 2;
                this.vx = Math.cos(angle) * burstFactor;
                this.vy = Math.sin(angle) * burstFactor;
            }
            
            this.lastBurst = frameCount;
            this.burstCooldown = 300 + Math.floor(Math.random() * 200);
        }
        
        // Periodic forced direction change to ensure blobs move across canvas
        if (frameCount % this.directionChangePeriod === 0 &&
            frameCount > this.lastDirectionChange + 60) {
            
            // More dramatic direction changes - target extremes of canvas
            let angle;
            const targetChoice = Math.random();
            
            if (targetChoice < 0.4) {
                // 40%: Target a random extreme edge point
                const edgePoints = [
                    {x: 0, y: Math.random() * height},               // Left edge
                    {x: width, y: Math.random() * height},           // Right edge
                    {x: Math.random() * width, y: 0},                // Top edge
                    {x: Math.random() * width, y: height}            // Bottom edge
                ];
                const target = edgePoints[Math.floor(Math.random() * 4)];
                angle = Math.atan2(target.y - this.y, target.x - this.x);
            } else if (targetChoice < 0.7) {
                // 30%: Target random point anywhere on canvas
                const targetX = width * Math.random();
                const targetY = height * Math.random();
                angle = Math.atan2(targetY - this.y, targetX - this.x);
            } else {
                // 30%: Move toward center with variation
                angle = Math.atan2(centerY - this.y, centerX - this.x) + 
                        (Math.random() - 0.5) * Math.PI;
            }
            
            // Much stronger direction impulse
            const newSpeed = 4.0 + Math.random() * 5.0; // 2-3x higher speeds
            
            // More dramatic velocity change
            this.vx += Math.cos(angle) * newSpeed * 0.8;
            this.vy += Math.sin(angle) * newSpeed * 0.8;
            
            this.lastDirectionChange = frameCount;
        }
        
        // Store current position as previous position
        this.px = this.x;
        this.py = this.y;
        
        // Update position
        this.x += this.vx;
        this.y += this.vy;
    };
    
    // Significantly reduced interaction to allow more passing through
    Blob.prototype.interact = function(others) {
        for (let i = 0; i < others.length; i++) {
            const other = others[i];
            if (other === this) continue;
            
            const dx = other.x - this.x;
            const dy = other.y - this.y;
            const distSquared = dx * dx + dy * dy;
            
            if (distSquared < interactionDistance * interactionDistance) {
                const dist = Math.sqrt(distSquared);
                const overlap = interactionDistance - dist;
                
                if (overlap > 0) {
                    const nx = dx / dist;
                    const ny = dy / dist;
                    
                    let strength = overlap * 0.005; // 50% less interaction resistance
                    
                    if (this.type === other.type) {
                        strength *= 0.1; // 50% less same-color interaction
                    } else {
                        strength *= blendFactor;
                        
                        if (overlap > interactionDistance * 0.3) {
                            const energyBoost = 0.1; // Higher energy boost
                            this.vx += (Math.random() - 0.5) * energyBoost;
                            this.vy += (Math.random() - 0.5) * energyBoost;
                            other.vx += (Math.random() - 0.5) * energyBoost;
                            other.vy += (Math.random() - 0.5) * energyBoost;
                        }
                    }
                    
                    const moveX = nx * strength;
                    const moveY = ny * strength;
                    
                    other.x += moveX;
                    other.y += moveY;
                    this.x -= moveX;
                    this.y -= moveY;
                }
            }
        }
    };
    
    // Draw blob to canvas
    Blob.prototype.draw = function() {
        metaCtx.drawImage(
            textures[this.type],
            this.x - this.radius,
            this.y - this.radius,
            this.radius * 2,
            this.radius * 2
        );
    };
    
    // Much larger buffer for wrap-around effect
    Blob.prototype.constrainToBounds = function() {
        // Allow blobs to go much further off-screen before wrapping
        const buffer = this.radius * 0.2;
        
        const farOutside = 
            this.x < -this.radius * 3 ||
            this.x > width + this.radius * 3 ||
            this.y < -this.radius * 3 ||
            this.y > height + this.radius * 3;
        
        if (farOutside) {
            if (this.x < -this.radius * 3) {
                this.x = width + buffer;
                this.px = this.x - this.vx;
                this.vx = -Math.abs(this.vx) * 0.95; // Almost no speed loss
            } else if (this.x > width + this.radius * 3) {
                this.x = -buffer;
                this.px = this.x - this.vx;
                this.vx = Math.abs(this.vx) * 0.95;
            }
            
            if (this.y < -this.radius * 3) {
                this.y = height + buffer;
                this.py = this.y - this.vy;
                this.vy = -Math.abs(this.vy) * 0.95;
            } else if (this.y > height + this.radius * 3) {
                this.y = -buffer;
                this.py = this.y - this.vy;
                this.vy = Math.abs(this.vy) * 0.95;
            }
        }
    };
    
    // Process and composite the image with enhanced overlap effects
    function processImage() {
        const imageData = metaCtx.getImageData(0, 0, width, height);
        const pix = imageData.data;
        
        for (let i = 0; i < pix.length; i += 4) {
            if (pix[i + 3] > 100) {
                const factor = Math.min(1.6, 1 + pix[i + 3] / 650);
                pix[i] = Math.min(255, pix[i] * factor);
                pix[i + 1] = Math.min(255, pix[i + 1] * factor);
                pix[i + 2] = Math.min(255, pix[i + 2] * factor);
                
                if (pix[i + 3] > 180) {
                    const max = Math.max(pix[i], pix[i + 1], pix[i + 2]);
                    const min = Math.min(pix[i], pix[i + 1], pix[i + 2]);
                    if (max > min) {
                        const satBoost = 1.3;
                        const avg = (pix[i] + pix[i + 1] + pix[i + 2]) / 3;
                        pix[i] = Math.min(255, avg + satBoost * (pix[i] - avg));
                        pix[i + 1] = Math.min(255, avg + satBoost * (pix[i + 1] - avg));
                        pix[i + 2] = Math.min(255, avg + satBoost * (pix[i + 2] - avg));
                    }
                }
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    // Animation loop with 60fps limit
    function run(timestamp) {
        if (!timestamp || timestamp - lastFrameTime >= frameInterval) {
            lastFrameTime = timestamp;
            frameCount++;
            
            // Clear the meta canvas
            metaCtx.clearRect(0, 0, width, height);
            
            // Update blobs
            for (let i = 0; i < blobs.length; i++) {
                blobs[i].update();
            }
            
            // Handle interactions between blobs
            for (let i = 0; i < blobs.length; i++) {
                blobs[i].interact(blobs);
                blobs[i].constrainToBounds();
            }
            
            // Draw blobs
            for (let i = 0; i < blobs.length; i++) {
                blobs[i].draw();
            }
            
            // Process and render the final image
            processImage();
        }
        
        // Continue animation loop
        return requestAnimationFrame(run);
    }
    
    // Start the animation
    return run();
}