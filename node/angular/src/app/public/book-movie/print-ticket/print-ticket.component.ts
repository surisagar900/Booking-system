import { Component, Input, OnInit } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-print-ticket',
  templateUrl: './print-ticket.component.html',
  styleUrls: ['./print-ticket.component.css'],
})
export class PrintTicketComponent implements OnInit {
  @Input() movieData: {
    seat: string[];
    title: string;
    tagline: string;
    price: number;
  };

  cost: number;

  constructor() {}
  ngOnInit(): void {}

  generatePDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then((canvas) => {
      var imgWidth = 208;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('newPDF.pdf');
    });
  }
}
