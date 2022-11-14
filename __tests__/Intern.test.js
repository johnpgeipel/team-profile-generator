const Intern = require('../lib/Intern');

test('creates an Intern object', () => {
    const intern = new Intern("John", 90, "testtest@gmail.com", "UWM");
    
    expect(intern.school) .toEqual(expect.any(String));
});

test('gets employee school', () => {
    const intern = new Intern("John", 90, "testtest@gmail.com", "UWM");
    
    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()));
});

test('gets role of employee', () => {
    const intern = new Intern("John", 90, "testtest@gmail.com", "UWM");

    expect(intern.getRole()).toEqual("Intern");
}); 