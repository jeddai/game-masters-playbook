import { Component, Input, forwardRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NpcService } from '../../_services/npc.service';
import * as _ from 'lodash';

const noop = () => {};

export const MARKDOWN_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NotesComponent),
    multi: true
};

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  providers: [MARKDOWN_CONTROL_VALUE_ACCESSOR]
})
export class NotesComponent implements ControlValueAccessor {

  constructor(private npcService: NpcService) { }

  @Input() editing: boolean;
  showAutocomplete: boolean = false;

  private innerValue: any = '';
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  get value(): any {
    return this.innerValue;
  };

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  onBlur() {
    this.onTouchedCallback();
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  loadNpc() {
    console.log('should load npc');
  }

  changed(event) {
    let value = event.target.value;
    let cursor = event.target.selectionStart;
    let pos = getPos(value, cursor);

    function getPos(value, cursor) {
      let count = 0;
      let ypos = 1;
      let xpos = 0;
      while(count <= cursor) {
        if(value[count] === '\n') {
          ypos++;
          xpos = 0;
        } else {
          xpos++;
        }
        count++;
      };
      return { ypos: ypos, xpos: xpos };
    }
  }

}
