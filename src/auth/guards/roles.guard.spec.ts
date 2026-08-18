import {
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import { RolesGuard } from './roles.guard';

import { UserRole } from '../../users/enums/user-role.enum';

describe('RolesGuard', () => {
  let guard: RolesGuard;

  const mockReflector = {
    getAllAndOverride: jest.fn(),
  };

  beforeEach(() => {
    guard = new RolesGuard(
      mockReflector as any,
    );

    jest.clearAllMocks();
  });

  it('debe estar definido', () => {
    expect(guard).toBeDefined();
  });

  it('debe permitir acceso si no hay roles requeridos', () => {
  mockReflector.getAllAndOverride
    .mockReturnValue(undefined);

  const context = {
    getHandler: jest.fn(),
    getClass: jest.fn(),
  } as unknown as ExecutionContext;

  expect(
    guard.canActivate(context),
  ).toBe(true);
});

  it('debe permitir acceso cuando el usuario tiene el rol requerido', () => {
    mockReflector.getAllAndOverride
      .mockReturnValue([
        UserRole.ADMIN,
      ]);

    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({
          user: {
            role: UserRole.ADMIN,
          },
        }),
      }),
    } as unknown as ExecutionContext;

    expect(
      guard.canActivate(context),
    ).toBe(true);
  });

  it('debe lanzar ForbiddenException cuando el usuario no tiene permisos', () => {
    mockReflector.getAllAndOverride
      .mockReturnValue([
        UserRole.ADMIN,
      ]);

    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({
          user: {
            role: UserRole.EMPLOYEE,
          },
        }),
      }),
    } as unknown as ExecutionContext;

    expect(() =>
      guard.canActivate(context),
    ).toThrow(
      ForbiddenException,
    );
  });
});