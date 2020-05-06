import program from 'commander';
import makeJsonDiff from './jsonDiff.js';

export default () => {
	program
		.description('Compares two configuration files and shows a difference.')
		.version('0.0.1', '-v, --version', 'output the version number')
		.helpOption('-h, --help', 'output usage information')
		.option('-f, --format [type]', 'output format')
		.arguments('<filepath1> <filepath2>')
		.action((filepath1, filepath2) => {
      const diff = makeJsonDiff(filepath1, filepath2);

      console.log(diff);
    });

	program.parse(process.argv);
};