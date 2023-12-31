import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-strategy';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  process.env.DEFAULT_STRATEGY,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SERCRET_KEY,
    });
  }

  async validate(payload) {
    return { id: payload.id, username: payload.username };
  }
}
