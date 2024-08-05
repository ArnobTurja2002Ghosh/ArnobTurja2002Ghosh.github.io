class Entity
{
    constructor(color, rect, texture)
    {
        this.rect = rect; this.color=color;
        this.prevRect=null;
        this.velocity=[0,0];
        this.up=false;
        this.state=null;
        this.texture=texture;
    }
}