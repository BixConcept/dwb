import subjects from "../../subjects.json";

export const getName = id => {
  return subjects[id.toString()];
};

export const getNames = ids => {
  let foo = [];
  for (let id of ids) {
    foo.push(getName(id));
  }
  console.log(foo);
  return foo;
};

export const getSubjects = () => {
  // console.log(subjects);
  return subjects;
};

export const getIDFromSelected = (names, selected) => {
  for (let key of Object.keys(names)) {
    if (names[key] === selected) {
      return parseInt(key);
    }
  }
};
