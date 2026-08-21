import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UserRole } from '../../users/enums/user-role.enum';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(() => {
    const configService = {
      get: jest.fn().mockReturnValue(
        'test-secret',
      ),
    } as unknown as ConfigService;

    strategy = new JwtStrategy(
      configService,
    );
  });

  it('debe estar definida', () => {
    expect(strategy).toBeDefined();
  });

  it('debe validar el payload correctamente', async () => {
    const payload = {
      sub: 1,
      email: 'admin@test.com',
      role: UserRole.ADMIN,
    };

    const result =
      await strategy.validate(payload);

    expect(result).toEqual({
      id: 1,
      email: 'admin@test.com',
      role: UserRole.ADMIN,
    });
  });
});