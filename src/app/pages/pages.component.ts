import {Component, OnInit} from '@angular/core';
import {HelperService} from "../core/services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  constructor(public helper: HelperService, private router: Router) {
  }
  ngOnInit(): void {
  }
}
