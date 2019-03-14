import {highlight_code_loc} from '.';


const unindent = (strings, ...parts)=> {
  const [, ...lines] = String.raw({raw: strings.raw}, ...parts).split('\n');
  const ind = lines[0].search(/[^ ]/);
  const str = lines.map((lne)=> lne.slice(ind)).join('\n');
  return str;
};


describe(highlight_code_loc, ()=> {

  it('highlights lines', ()=> {
    expect(
      highlight_code_loc(unindent`
        test data
      `, {
        start: {line: 1, column: 5},
        end: {line: 1, column: 8}
      })
    ).toBe(unindent`
      1| test data
              ^
      2| `
    );
  });

  it('highlights at most 4 line beofre', ()=> {
    expect(
      highlight_code_loc(unindent`
        line 1
        line 2
        line 3
        line 4
        line 5
        line 6
        line 7
      `, {
        start: {line: 6, column: 5},
        end: {line: 6, column: 8}
      })
    ).toBe(unindent`
      3| line 3
      4| line 4
      5| line 5
      6| line 6
              ^
      7| line 7
      8| `
    );
  });


  it('highlights at most 3 line after', ()=> {
    expect(
      highlight_code_loc(unindent`
        line 1
        line 2
        line 3
        line 4
        line 5
        line 6
        line 7
      `, {
        start: {line: 2, column: 5},
        end: {line: 2, column: 8}
      })
    ).toBe(unindent`
      1| line 1
      2| line 2
              ^
      3| line 3
      4| line 4
      5| line 5`
    );
  });
});
