
const bracket = (min, value, max)=> (
  Math.max(min, Math.min(value, max))
);


const default_opts = {
  lines: {
    before: 4,
    after: 3
  }
};


export const highlight_code_loc = (code, loc, options=default_opts)=> {
  const {lines: {before, after}} = options;
  const min = before;

  const lines = code.split('\n');

  const start_line = bracket(0, loc.start.line - before, lines.length - min);
  const end_line = bracket(0, loc.end.line + after, lines.length);

  const pad = `${end_line}`.length;

  const code_lines = lines
    .slice(start_line, end_line)
    .map((line, idx)=> {
      const line_num = `${start_line + idx + 1}`.padStart(pad);
      return `${line_num}| ${line}`;
    });

  const underline = `${' '.repeat(pad + loc.start.column)}  ^`;
  code_lines.splice(loc.start.line - start_line, 0, underline);

  return code_lines.join('\n');
};
