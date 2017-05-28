import { getAttribute, getPoolString } from '../';
import { JavaClassFileReader } from 'java-class-tools';

test('getAttribute and getPoolString should work', () => {
  const reader = new JavaClassFileReader();
  const classFile = reader.read(`${__dirname}/test-data/Test.class`);
  const { methods, constant_pool } = classFile;

  const method1 = methods[1];
  const codeAttribute = getAttribute(classFile, method1, 'Code');

  expect(codeAttribute.code)
    .not.toBeUndefined(undefined);

  expect(getPoolString(constant_pool, codeAttribute.attribute_name_index))
    .toBe('Code');
});