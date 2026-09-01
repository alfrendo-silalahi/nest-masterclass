import { describe, it, expect } from 'vitest';

describe('UsersService', () => {
  describe('demoTest', () => {
    it('demo test', async () => {
      expect('demo test').toBe('demo test 123');
    });
  });

  describe('demoTest2', async () => {
    it('demo test 2', async () => {
      expect('demo test 2').toBe('demo test 12356');
    });
  });
});
