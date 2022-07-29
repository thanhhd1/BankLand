import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { MessageConstant } from 'src/app/modules/common/constant/message.const';
import { OrganizationModel } from 'src/app/modules/common/models/organization.model';
import { BaseComponent } from 'src/app/modules/base.component';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router } from '@angular/router';
import { OrganizationService } from 'src/app/modules/common/services/organization.service';
import { RepresentativeService } from 'src/app/modules/common/services/representative.service';
import { RepresentativeModel } from 'src/app/modules/common/models/representative.model';
import { Select2OptionData } from 'ng2-select2';

@Component({
  selector: 'app-organization-info',
  templateUrl: './organization-info.component.html',
  styleUrls: ['./organization-info.component.css']
})
export class OrganizationInfoComponent extends BaseComponent implements OnInit {
  model: OrganizationModel;
  Submitting: boolean = false;
  isEdit: boolean = false;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;
  representatives: Array<Select2OptionData> = new Array<Select2OptionData>();
  constructor(
    authService: AuthenticationService,
    private dialog: CommonDialogService,
    private router: Router,
    private service: OrganizationService,
    private representativeService: RepresentativeService,
    private cdChanged: ChangeDetectorRef
  ) {
    super(authService);
  }

  ngOnInit() {
    this.model = new OrganizationModel();
  }

  getRepresentatives() {
    this.representatives = null;
    this.representativeService.GetAll().subscribe(r => {
      if (r) {
        var list = [];
        r.forEach(c => {
          list.push({
            id: c.ID,
            text: c.Name
          });
        });
        this.representatives = list;
      }
    })
  }


  getEntity(id) {
    this.service.Get(id).subscribe(r => {
      this.model = r;
    });
  }
  
  show(isEdit, id) {
    this.isEdit = isEdit;
    this.Submitting = false;
    this.model = new OrganizationModel(); 
    this.form.resetForm();
    if (this.isEdit) {
      this.getEntity(id);
    }
    this.getRepresentatives();
    this.cdChanged.detectChanges();
    this.modal.show();
  }

  representativeChanged(event) {
    if (event.data && event.data.length>0) {
      if (event.data[0] && event.data[0].selected) {
        this.model.RepresentativeID = event.value
      }  
      else if (this.model.RepresentativeID) {
        $(event.data[0].element.parentElement).val(this.model.RepresentativeID).trigger('change');
      }
      else {
        $(event.data[0].element.parentElement).val(null).trigger('change');
      }
    }
  }

  save() {
    if (this.Submitting) return;
    this.Submitting = true;
    if (this.isEdit) {
      this.service.Edit(this.model).subscribe(
        result => {
          if (result) {
            this.Submitting = false;
            this.dialog.showSwalSuccesAlert(
              `${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Organization`,MessageConstant.EDIT_SCCCESS_CONST
            );
            this.onClose.emit(true);
            this.cancel();
          }
        },
        error => {
          this.Submitting = false;
          var strMessage =
            error && error.error
              ? error.error
              : MessageConstant.FAILURE_REQUEST;
          this.dialog.showSwalErrorAlert(
            `${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Organization`,
            strMessage
          );
        }
      );
    } else {
      this.service.Create(this.model).subscribe(
        result => {
          if (result) {
            this.Submitting = false;
            this.dialog.showSwalSuccesAlert(
              `${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Organization`,MessageConstant.ADD_SUCCESS_CONST
            );
            this.onClose.emit(true);
            this.cancel();
          }
        },
        error => {
          this.Submitting = false;
          var strMessage =
            error && error.error
              ? error.error
              : MessageConstant.FAILURE_REQUEST;
          this.dialog.showSwalErrorAlert(
            `${this.isEdit ? 'Chỉnh Sửa' : 'Thêm Mới'} Organization`,
            strMessage
          );
        }
      );
    }
  }

  cancel() {
    this.modal.hide();
  }
}
