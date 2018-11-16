import { NgModule } from '@angular/core';
import { ObjtoarrayPipe } from './objtoarray/objtoarray';
import { BeautifyMessagePipe } from './beautify-message/beautify-message';
import { DistanceUnitPipe } from './distance-unit/distance-unit';
@NgModule({
	declarations: [
		BeautifyMessagePipe,
		ObjtoarrayPipe,
    DistanceUnitPipe,
	],
	imports: [],
	exports: [
		BeautifyMessagePipe,
		ObjtoarrayPipe,
    DistanceUnitPipe
	]
})
export class PipesModule {}
