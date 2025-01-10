import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UsersEffectEffects } from './users-effect.effects';

describe('UsersEffectEffects', () => {
  let actions$: Observable<any>;
  let effects: UsersEffectEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersEffectEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(UsersEffectEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
