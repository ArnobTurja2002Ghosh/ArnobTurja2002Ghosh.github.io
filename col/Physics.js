class Physics
{
    constructor(){

    }
    getOverlap(a,b){
        let x1=a.rect[2]/2 + b.rect[2]/2 - Math.abs(a.rect[0]+a.rect[2]/2-(b.rect[0]+b.rect[2]/2));
        let y1=a.rect[3]/2 + b.rect[3]/2 - Math.abs(a.rect[1]+a.rect[3]/2-(b.rect[1]+b.rect[3]/2));
        return [x1, y1];
    }
    getPreviousOverlap(a,b){
        //console.log(b.prevRect);
        let x1=a.rect[2]/2 + b.rect[2]/2 - Math.abs(a.rect[0]+a.rect[2]/2-(b.prevRect[0]+b.rect[2]/2));
        let y1=a.rect[3]/2 + b.rect[3]/2 - Math.abs(a.rect[1]+a.rect[3]/2-(b.prevRect[1]+b.rect[3]/2));
        return [x1, y1];
    }
}