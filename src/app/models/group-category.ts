export class GroupCategory {
    constructor(
        public title: string,
        public subtitle: string,
        public slug: string,
        public icon: string,
        public image: string,
        public isEnable: boolean = false,
        public ordering: number = 0
      ) {  }
    
}
