const { spawn } = require('child_process');

const TextColors = {
	Black:       '\033[0;30m',
	DarkGray:    '\033[1;30m',
	Red:         '\033[0;31m',
	LightRed:    '\033[1;31m',
	Green:       '\033[0;32m',
	LightGreen:  '\033[1;32m',
	BrownOrange: '\033[0;33m',
	Yellow:      '\033[1;33m',
	Blue:        '\033[0;34m',
	LightBlue:   '\033[1;34m',
	Purple:      '\033[0;35m',
	LightPurple: '\033[1;35m',
	Cyan:        '\033[0;36m',
	LightCyan:   '\033[1;36m',
	LightGray:   '\033[0;37m',
	White:       '\033[1;37m',
	Reset:       '\033[0:0m',
};

let hasLaunchedElectron = false;

let printTaggedText = function(tag, text, tagColor, txtColor) {
	console.log(`${tagColor}[${tag}]${txtColor}${text}${TextColors.Reset}`);
};

let launchProc = function({cmd, args, tag, tagColor, onData, onExit}) {
	let proc = spawn(cmd, args);

	proc.stdout.on('data', (data) => {
		printTaggedText(tag, data.toString(), tagColor, TextColors.Reset);
		onData(data);
	});

	proc.on('exit', (code) => {
		printTaggedText(tag, `Process exited with code ${code}`, tagColor, TextColors.Reset);
		onExit(code);
	});
};

let electronProcConfig = {
	cmd: 'npm',
	args: ['run', 'electron-start', '--', '--dev'],
	tag: 'ELECT',
	tagColor: TextColors.Red,
	onData: (data) => {},
	onExit: (code) => {}
};

let vueProcConfig = {
	cmd: 'npm',
	args: ['run', 'serve'],
	tag: 'VUEJS',
	tagColor: TextColors.Green,
	onData: (data) => {
		// Look for Vue to tell us the server has started with a local url 
		// before we kick off the Electron process...
		if (!hasLaunchedElectron && data.toString().includes('- Local:')) {
			// Look for the url and port that Vue is using for its dev server
			let matches = data.toString().match(/- Local\:\s+(http:\/\/.*?\:\d+)/);

			// Pass the dev server url as an argument to our Electron main.js
			electronProcConfig.args.push('--url=' + matches[1]);
			launchProc(electronProcConfig);
      hasLaunchedElectron = true;
		}
	},
	onExit: (code) => {}
};

launchProc(vueProcConfig);
