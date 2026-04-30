import { Component, ElementRef, signal, viewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import ApiService from './api.service';
import { interval, map, shareReplay, switchMap, timer } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, FormField],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  inputs = viewChildren('input', { read: ElementRef });
  api: ApiService;
  items = signal([
    {
      check: false,
      text: 'no',
    },
  ]);
  form = form(this.items);
  haha = 'lol';
  protected readonly title = signal('angular-project');

  constructor(api: ApiService) {
    this.api = api;
    timer(0, 5000)
      .pipe(switchMap(() => this.api.get()))
      .subscribe((items) => {
        this.form().value.set(
          items.map((item) => ({
            check: item.checked,
            text: item.name,
          })),
        );
      });
  }

  onEnter(index: number) {
    this.form().value.update((items) => [...items, { text: '', check: false }]);

    setTimeout(() => {
      this.focus(index + 1);
    });
  }

  onUp(index: number) {
    this.focus(index - 1);
  }

  onDown(index: number) {
    this.focus(index + 1);
  }

  focus(index: number) {
    const el = this.inputs()[index]?.nativeElement;
    el.focus();
    const end = el.value.length;
    setTimeout(() => {
      el.setSelectionRange(0, end);
    });
  }

  onBackspace(index: number) {
    const item = this.form[index];
    if (!item.text().value().length && this.form().value().length > 1) {
      this.form().value.update((items) => [...items.slice(0, index), ...items.slice(index + 1)]);
      setTimeout(() => {
        this.focus(index - 1);
      });
    }
  }

  save() {
    const data = this.form()
      .value()
      .map((item) => ({
        checked: item.check,
        name: item.text,
      }));

    this.api.save(data).subscribe(() => {});
  }
}
