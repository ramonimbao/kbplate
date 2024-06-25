import Decimal from 'decimal.js'
import makerjs from 'makerjs'
import { CutoutGenerator } from './CutoutGenerator'

// MX Only 5-pin PCB cutout

export class SwitchPCBMXOnly extends CutoutGenerator {

    generate(key, generatorOptions) {

        // const width = new Decimal("14")
        // const height = new Decimal("14")
        // const plusHalfWidth = width.dividedBy(new Decimal("2"))
        // const minsHalfWidth = width.dividedBy(new Decimal("-2"))
        // const plusHalfHeight = height.dividedBy(new Decimal("2"))
        // const minsHalfHeight = height.dividedBy(new Decimal("-2"))
        
        // let upperLeft =  [minsHalfWidth.plus(generatorOptions.kerf).toNumber(), plusHalfHeight.minus(generatorOptions.kerf).toNumber()]
        // let upperRight = [plusHalfWidth.minus(generatorOptions.kerf).toNumber(), plusHalfHeight.minus(generatorOptions.kerf).toNumber()]
        // let lowerLeft =  [minsHalfWidth.plus(generatorOptions.kerf).toNumber(), minsHalfHeight.plus(generatorOptions.kerf).toNumber()]
        // let lowerRight = [plusHalfWidth.minus(generatorOptions.kerf).toNumber(), minsHalfHeight.plus(generatorOptions.kerf).toNumber()]
        
        // var model = {
        //     paths: {
        //         lineTop: new makerjs.paths.Line(upperLeft, upperRight),
        //         lineBottom: new makerjs.paths.Line(lowerLeft, lowerRight),
        //         lineLeft: new makerjs.paths.Line(upperLeft, lowerLeft),
        //         lineRight: new makerjs.paths.Line(upperRight, lowerRight)
        //     }
        // }
        

        // if (generatorOptions.switchFilletRadius.gt(0)) {

        //     const filletNum = generatorOptions.switchFilletRadius.toNumber() 

        //     var filletTopLeft = makerjs.path.fillet(model.paths.lineTop, model.paths.lineLeft, filletNum)
        //     var filletTopRight = makerjs.path.fillet(model.paths.lineTop, model.paths.lineRight, filletNum)
        //     var filletBottomLeft = makerjs.path.fillet(model.paths.lineBottom, model.paths.lineLeft, filletNum)
        //     var filletBottomRight = makerjs.path.fillet(model.paths.lineBottom, model.paths.lineRight, filletNum)
            
        //     model.paths.filletTopLeft = filletTopLeft;
        //     model.paths.filletTopRight = filletTopRight;
        //     model.paths.filletBottomLeft = filletBottomLeft;
        //     model.paths.filletBottomRight = filletBottomRight;

        // }

        // ---
        const centerHoleRadius = new Decimal("1.994")
        const stabilizingLegsRadius = new Decimal("0.851")
        const switchHoleRadius = new Decimal("0.735")
        
        let cutouts = {
            paths: {
                centerHole: new makerjs.paths.Circle(centerHoleRadius.plus(generatorOptions.kerf).toNumber()),
                stabilizingLegLeft: new makerjs.paths.Circle([-5.08, 0], stabilizingLegsRadius.plus(generatorOptions.kerf).toNumber()),
                stabilizingLegRight: new makerjs.paths.Circle([5.08, 0], stabilizingLegsRadius.plus(generatorOptions.kerf).toNumber()),
                switchHoleLeft: new makerjs.paths.Circle([-3.81, 2.54], switchHoleRadius.plus(generatorOptions.kerf).toNumber()),
                switchHoleRight: new makerjs.paths.Circle([2.54, 5.08], switchHoleRadius.plus(generatorOptions.kerf).toNumber())
            }
        }

        if (!key.skipOrientationFix && key.height > key.width) {
            cutouts = makerjs.model.rotate(cutouts, -90)
        } 
        
        return cutouts;
    }
}