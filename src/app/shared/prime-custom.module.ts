import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesModule } from 'primeng/messages';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';

import { AccordionModule } from 'primeng/accordion';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TabViewModule } from 'primeng/tabview';
import { FieldsetModule } from 'primeng/fieldset';
import { MenuModule } from 'primeng/menu';
import { DividerModule } from 'primeng/divider';
import { SplitterModule } from 'primeng/splitter';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { SkeletonModule } from 'primeng/skeleton';

import { CardModule } from 'primeng/card';
import { TabMenuModule } from 'primeng/tabmenu';

import { ChartModule } from 'primeng/chart';
import { ProgressBarModule } from 'primeng/progressbar';

import { MenubarModule } from 'primeng/menubar';

const PRIME_MODULES = [
  CalendarModule,
  CarouselModule,
  CommonModule,
  BadgeModule,
  ButtonModule,
  DialogModule,
  DropdownModule,
  DynamicDialogModule,
  FileUploadModule,
  InputNumberModule,
  InputMaskModule,
  InputSwitchModule,
  InputTextareaModule,
  InputTextModule,
  MultiSelectModule,
  RadioButtonModule,
  RatingModule,
  RippleModule,
  SidebarModule,
  StyleClassModule,
  TableModule,
  ToastModule,
  ToolbarModule,
  TooltipModule,
  TagModule,
  AccordionModule,
  SplitButtonModule,
  TabViewModule,
  FieldsetModule,
  MenuModule,
  DividerModule,
  SplitterModule,
  PanelModule,
  CheckboxModule,
  ConfirmDialogModule,
  ConfirmPopupModule,
  MessagesModule,
  AvatarModule,
  SkeletonModule,
  CardModule,
  TabMenuModule,
  ChartModule,
  ProgressBarModule,
  MenubarModule,
];

@NgModule({
  imports: [...PRIME_MODULES],
  exports: [...PRIME_MODULES],
  providers: [DialogService, MessageService, ConfirmationService],
})
export class PrimeCustomModule {}
