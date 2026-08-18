import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(() => {
    process.env.JWT_SECRET =
      'test-secret';

    strategy = new JwtStrategy();
  });

  it('debe estar definida', () => {
    expect(strategy).toBeDefined();
  });

  it('debe validar el payload correctamente', async () => {
    const payload = {
      sub: 1,
      email: 'admin@test.com',
      role: 'admin',
    };

    const result =
      await strategy.validate(payload);

    expect(result).toEqual({
      id: 1,
      email: 'admin@test.com',
      role: 'admin',
    });
  });
});