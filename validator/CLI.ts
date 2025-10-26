import PoleSize from "../src/types/PoleSize";
import {GAME_CONFIG} from "../src/config";
import validate from "./validator";

function main() {
  const args = process.argv.slice(2);

  // --help и -h перехватывает npm(
  if (args.length === 0 || args.includes('help') || args.includes('h')) {
    showHelp();
    return;
  }

  try {
    const moves = parseMoves(args);
    const size = parseSize(args);

    console.log('Processing moves:', moves);
    console.log('Board size:', size);
    console.log('---');

    const result = validate(moves, size);
    console.log(JSON.stringify(result, null, 2));

  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
    showHelp();
    process.exit(1);
  }
}

function parseMoves(args: string[]): number[] {
  const moves: number[] = [];

  for (const arg of args) {
    if (arg.startsWith('--')) break;

    const move = parseInt(arg, 10);
    if (isNaN(move) || move < 1) {
      throw new Error(`Invalid move: ${arg}. Moves must be positive numbers.`);
    }
    moves.push(move);
  }

  if (moves.length === 0) {
    throw new Error('No valid moves provided');
  }

  return moves;
}

function parseSize(args: string[]): PoleSize {
  const size = {...GAME_CONFIG};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--height' && args[i + 1]) {
      const height = parseInt(args[i + 1], 10);
      if (isNaN(height) || height < 1) {
        throw new Error(`Invalid height: ${args[i + 1]}`);
      }
      size.height = height;
    }

    if (args[i] === '--width' && args[i + 1]) {
      const width = parseInt(args[i + 1], 10);
      if (isNaN(width) || width < 1) {
        throw new Error(`Invalid width: ${args[i + 1]}`);
      }
      size.width = width;
    }
  }

  return size;
}

function showHelp(): void {
  console.log(`
Connect Four Game Validator

Usage:
  npm run validate <moves> [options]

Arguments:
  <moves>                 Space-separated list of column moves (1-based index)
                          Example: 1 2 1 2 3 2

Options:
  --height <number>       Board height (default: 6)
  --width <number>        Board width (default: 7)
  help, h                 Show this help message

Examples:
  npm run validate -- 1 2 1 2 3 2
  npm run validate -- 1 2 3 1 2 3 -- --height 6 -- --width 7
  npm run validate -- help
    `);
}

if (require.main === module) {
  main();
}