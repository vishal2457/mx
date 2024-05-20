import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ControlsOf } from '../../../../shared/utils/form-controls-of';
import {
  GAME_SLUG,
  TMatch,
  Z_match,
} from '../../../../../../../../libs/mx-schema/src';

@Component({
  selector: 'match-form',
  templateUrl: './match-form.component.html',
})
export class MatchFormComponent {
  private fb = inject(FormBuilder);

  showErrors = false;
  GAMES = Array.from(GAME_SLUG);
  previousFilenames: any = {};
  zMatch = Z_match;

  matchForm = this.fb.nonNullable.group<
    ControlsOf<Omit<TMatch, 'id' | 'teamTwoSlug' | 'teamOneSlug'>>
  >({
    gameSlug: new FormControl('cricket', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    teamOne: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    teamTwo: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    h2hTeam: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    league: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    venue: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    startDate: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    startTime: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    status: new FormControl('waiting', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    description: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    format: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    teamOneLogo: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    teamTwoLogo: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    h2hTeamImage: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    premiumTeamImage: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });
  get matchFormControls() {
    return this.matchForm.controls;
  }

  handleTeamOneLogo(file: any) {
    this.matchForm.patchValue({ teamOneLogo: file });
  }

  handleTeamTwoLogo(file: any) {
    this.matchForm.patchValue({ teamTwoLogo: file });
  }

  handleH2hTeamImage(file: any) {
    this.matchForm.patchValue({ h2hTeamImage: file });
  }

  handlePremiumTeamImage(file: any) {
    this.matchForm.patchValue({ premiumTeamImage: file });
  }
}
