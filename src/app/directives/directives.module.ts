import { NgModule } from '@angular/core';
import { MessageDateDirective } from './message-date/message-date';
import { ScrollableDirective } from './scrollable/scrollable';

@NgModule({
	declarations: [MessageDateDirective, ScrollableDirective,
    ],
	imports: [],
	exports: [MessageDateDirective, ScrollableDirective,
    ]
})
export class DirectivesModule {}
