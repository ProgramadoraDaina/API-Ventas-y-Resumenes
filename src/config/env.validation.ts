import { plainToInstance } from 'class-transformer';
import {
    IsNumber,
    IsOptional,
    IsString,
    MinLength,
    validateSync,
} from 'class-validator';

class EnvironmentVariables {
    @IsNumber()
    PORT!: number;

    @IsString({
        message: 'DATABASE_URL es obligatoria',
    })
    DATABASE_URL!: string;

    @IsString()
    @MinLength(32, {
        message:
            'JWT_SECRET debe tener al menos 32 caracteres',
    })
    JWT_SECRET!: string;

    @IsString()
    @MinLength(32, {
        message:
            'JWT_REFRESH_SECRET debe tener al menos 32 caracteres',
    })
    JWT_REFRESH_SECRET!: string;

    @IsString()
    JWT_EXPIRES_IN!: string;

    @IsString()
    JWT_REFRESH_EXPIRES_IN!: string;

    @IsOptional()
    @IsString()
    NODE_ENV?: string;

    @IsString({
        message:
            'CORS_ORIGIN es obligatoria (ej: http://localhost:3001)',
    })
    CORS_ORIGIN!: string;
}

export function validate(
    config: Record<string, unknown>,
) {
    const validated = plainToInstance(
        EnvironmentVariables,
        config,
        {
            enableImplicitConversion: true,
        },
    );

    const errors = validateSync(
        validated,
        {
            skipMissingProperties: false,
        },
    );

    if (errors.length > 0) {
        const mensajes = errors.flatMap(
            (error) =>
                Object.values(
                    error.constraints ?? {},
                ),
        );

        throw new Error(
            `Error en variables de entorno:\n- ${mensajes.join(
                '\n- ',
            )}`,
        );
    }

    return validated;
}
export type { EnvironmentVariables };