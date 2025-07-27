#!/usr/bin/env node

const { spawn } = require('child_process');
const { execSync } = require('child_process');

// Function to check if a port is in use
function isPortInUse(port) {
  try {
    execSync(`lsof -i :${port}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Function to kill processes on specific ports
function killPort(port) {
  try {
    execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: 'ignore' });
    console.log(`Killed processes on port ${port}`);
  } catch (error) {
    // Port might not be in use, which is fine
  }
}

// Function to start a process with fallback ports
function startWithFallback(command, primaryPort, fallbackPort, name) {
  const port = isPortInUse(primaryPort) ? fallbackPort : primaryPort;
  
  if (port !== primaryPort) {
    console.log(`⚠️  Port ${primaryPort} is busy, using ${port} for ${name}`);
    killPort(primaryPort);
  }
  
  const env = { ...process.env };
  if (command.includes('next')) {
    env.PORT = port.toString();
  }
  if (command.includes('studio')) {
    env.SANITY_PORT = port.toString();
  }
  
  const child = spawn(command, [], { 
    stdio: 'inherit', 
    env,
    shell: true 
  });
  
  child.on('error', (error) => {
    console.error(`Failed to start ${name}:`, error);
  });
  
  return child;
}

// Main execution
console.log('🚀 Starting development environment...');

// Kill any existing processes on our ports
killPort(3000);
killPort(3001);
killPort(3333);
killPort(3334);

// Start frontend with fallback
const frontend = startWithFallback('npm run dev:frontend', 3000, 3001, 'Frontend');

// Start studio with fallback
const studio = startWithFallback('npm run dev:studio', 3333, 3334, 'Studio');

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down development servers...');
  frontend.kill('SIGINT');
  studio.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down development servers...');
  frontend.kill('SIGTERM');
  studio.kill('SIGTERM');
  process.exit(0);
}); 