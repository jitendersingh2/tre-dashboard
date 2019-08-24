import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { NbIconLibraries } from '@nebular/theme';
import { NbWindowService } from '@nebular/theme';

@Component({
  selector: 'ngx-edit-project-details-dialog',
  templateUrl: './edit-project-details-dialog.component.html',
  styleUrls: ['./edit-project-details-dialog.component.scss']
})
export class EditProjectDetailsDialogComponent implements OnInit {

  @Input() data: any;
  expectedIndicators: Array<any> = [];
  settings = {
    mode: 'external',
    hideSubHeader	: true,
    actions: {
      add: false,
      delete: false,
    },
    edit: {
      editButtonContent: '<nb-checkbox status="primary" checked="true" (checkedChange)="checkedChange($event, result)" />',
    },
    columns: {
      IND_NAME: {
        title: 'Indicator',
        type: 'string',
      },
      TGT_VAL_TEXT: {
        title: 'Target Value',
        type: 'string',
      },      
    },
  };
  
  constructor(protected ref: NbDialogRef<EditProjectDetailsDialogComponent>, iconsLibrary: NbIconLibraries, private windowService: NbWindowService) {
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
  }

  ngOnInit() {
    this.expectedIndicators = this.data.projectDetails.indicators;
  }

  updateProjectDetails(fieldType: string, fiedlValue: string) {
    this.data.projectDetails[fieldType] = fiedlValue;
  }

  openWindow(contentTemplate, data) {
    this.windowService.open(
      contentTemplate,
      {
        title: 'Project Context',
        context: {
          text: data,
        },
      },
    );
  }
  
  cancel() {
    this.ref.close();
  }

  checkedChange(checked: boolean, result: any) {
    console.log('e- ', checked, result);
    const { indicators } = this.data.projectDetails;
    let newIndicators = [];
    if(!checked) {
      newIndicators = indicators.filter(originalIndicator => originalIndicator.indicator !== result.indicator);
    } else {
      newIndicators = [...indicators, result].sort();
    }
    this.expectedIndicators = newIndicators;
  }

  submit() {
    this.ref.close({...this.data.projectDetails, indicators: this.expectedIndicators});
  }
}
