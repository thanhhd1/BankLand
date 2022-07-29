import { Component, OnInit, EventEmitter, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from 'src/app/modules/base.component';
import { Select2OptionData } from 'ng2-select2';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/common/services/authentication.service';
import { CommonDialogService } from 'src/app/modules/common/services/dialog.service';
import { Router } from '@angular/router';
import { RepresentativeService } from 'src/app/modules/common/services/representative.service';
import { OrganizationService } from 'src/app/modules/common/services/organization.service';
import { LicenseTypeService } from 'src/app/modules/common/services/license-type.service';
import { LicenseTypeModel } from 'src/app/modules/common/models/license-type.model';
import { KaraokeHistoryService } from 'src/app/modules/common/services/karaoke-history.service';
import { KaraokeHistoryModel } from 'src/app/modules/common/models/karaoke-history.model';

@Component({
  selector: 'app-karaoke-history-info',
  templateUrl: './karaoke-history-info.component.html',
  styleUrls: ['./karaoke-history-info.component.css']
})
export class KaraokeHistoryInfoComponent extends BaseComponent implements OnInit {
  model: KaraokeHistoryModel;
  representatives: Array<Select2OptionData> = new Array<Select2OptionData>();
  organizations: Array<Select2OptionData> = new Array<Select2OptionData>();
  licenseTypes: Array<LicenseTypeModel>;
  @ViewChild('childModal') modal: ModalDirective;
  @ViewChild('f') form: NgForm;

  constructor(authService: AuthenticationService,
    private dialog: CommonDialogService,
    private router: Router,
    private service: KaraokeHistoryService,
    private representativeService: RepresentativeService,
    private organizationService: OrganizationService,
    private licenseTypeService: LicenseTypeService) {
    super(authService);
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
        list.unshift({ id: '', text: '-- Người Đăng Ký --' });
        this.representatives = list;
      }
    })
  }

  getOrganization() {
    this.organizations = null;
    this.organizationService.GetAll().subscribe(r => {
      if (r) {
        var list = [];
        r.forEach(c => {
          list.push({
            id: c.ID,
            text: c.Name
          });
        });
        list.unshift({ id: '', text: '--Chọn Tên Tổ Chức--' });
        this.organizations = list;
      }
    })
  }

  getLicenseType() {
    this.licenseTypes = null;
    this.licenseTypeService.GetByType(2).subscribe(r => {
      if (r) {
        this.licenseTypes = r;
      }
    })
  }

  ngOnInit() {
    this.model = new KaraokeHistoryModel();
  }

  getEntity(id) {
    this.service.GetInclude(id).subscribe(r => {
      this.model = r;
      this.modal.show();
    });
  }

  show(id) {
    this.getEntity(id);
    this.getRepresentatives();
    this.getOrganization();
    this.getLicenseType();
  }

  cancel() {
    this.modal.hide();
  }

  representativeChanged(event) {
    if (event.data && event.data.length > 0) {
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

  organizationChanged(event) {
    if (event.data && event.data.length > 0) {
      if (event.data[0] && event.data[0].selected) {
        this.model.OrganizationID = event.value
      }
      else if (this.model.OrganizationID) {
        $(event.data[0].element.parentElement).val(this.model.OrganizationID).trigger('change');
      }
      else {
        $(event.data[0].element.parentElement).val(null).trigger('change');
      }
    }
  }

  getLicenseTypeName(LicenseTypeID) {
    if (this.licenseTypes && this.licenseTypes.length > 0) {
      var index = this.licenseTypes.findIndex(c => c.ID == LicenseTypeID);
      if (index >= 0) {
        var item = this.licenseTypes[index];
        return item.Name;
      }
    }
    return '';
  }
}
