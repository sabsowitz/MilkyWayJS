import { Component, OnInit } from '@angular/core';
// import { ObjectMapper } from "json-object-mapper";
import { SearchService } from "./shared/search.service";
// import { SearchQueryResponse } from "./shared/search";
import * as _ from "lodash";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchQuery: string;
  images: string[];
  data: string[];
  link: string[];
  page: number;

  constructor(private service: SearchService) { }

  ngOnInit() {}

  onSearch(){
    this.service.search(this.searchQuery)
      .subscribe(data =>  {
        let imageData = data.collection.items;
        this.images = this.mapImages(imageData);
      });
    }
    
    mapImages(imageData) {
      return _.map(imageData, function (image) {
        return {
          type: image.data[0].media_type,
          title: image.data[0].title,
          description: image.data[0].description,
          link: image.links && image.links[0].href
        }
      });
    }

    onPageChanged(event: any): void {
      console.log('event page: ' + event.page);
      if (event.page != this.page + 1) {
        this.page = event.page - 1;
        this.onSearch();
      }
    }
}
