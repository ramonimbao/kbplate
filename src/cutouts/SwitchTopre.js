import Decimal from 'decimal.js'
import makerjs from 'makerjs'
import { CutoutGenerator } from './CutoutGenerator'

// Topre switch cutout

export class SwitchTopre extends CutoutGenerator {

    generate(key, generatorOptions) {

        const width = new Decimal("14.6")
        const height = new Decimal("14")
        const innerWidth = new Decimal("12.6")
        const innerHeight = new Decimal("12")

        const plusHalfWidth = width.dividedBy(new Decimal("2"))
        const minsHalfWidth = width.dividedBy(new Decimal("-2"))
        const plusHalfHeight = height.dividedBy(new Decimal("2"))
        const minsHalfHeight = height.dividedBy(new Decimal("-2"))

        const plusHalfInnerWidth = innerWidth.dividedBy(new Decimal("2"))
        const minsHalfInnerWidth = innerWidth.dividedBy(new Decimal("-2"))
        const plusHalfInnerHeight = innerHeight.dividedBy(new Decimal("2"))
        const minsHalfInnerHeight = innerHeight.dividedBy(new Decimal("-2"))

        //    B_____C
        // A /      \ D
        //  |        |
        //  |        |
        // H \______/ E
        //    G     F

        let pointA = [minsHalfWidth.plus(generatorOptions.kerf).toNumber(), plusHalfInnerHeight.minus(generatorOptions.kerf).toNumber()]
        let pointB = [minsHalfInnerWidth.plus(generatorOptions.kerf).toNumber(), plusHalfHeight.minus(generatorOptions.kerf).toNumber()]
        let pointC = [plusHalfInnerWidth.minus(generatorOptions.kerf).toNumber(), plusHalfHeight.minus(generatorOptions.kerf).toNumber()]
        let pointD = [plusHalfWidth.minus(generatorOptions.kerf).toNumber(), plusHalfInnerHeight.minus(generatorOptions.kerf).toNumber()]
        let pointE = [plusHalfWidth.minus(generatorOptions.kerf).toNumber(), minsHalfInnerHeight.plus(generatorOptions.kerf).toNumber()]
        let pointF = [plusHalfInnerWidth.minus(generatorOptions.kerf).toNumber(), minsHalfHeight.plus(generatorOptions.kerf).toNumber()]
        let pointG = [minsHalfInnerWidth.plus(generatorOptions.kerf).toNumber(), minsHalfHeight.plus(generatorOptions.kerf).toNumber()]
        let pointH = [minsHalfWidth.plus(generatorOptions.kerf).toNumber(), minsHalfInnerHeight.plus(generatorOptions.kerf).toNumber()]

        let keySize = key.width;

        var model = {};
        if (keySize.gte(2) && keySize.lt(3)) {
            model = {
                paths: {}
            }
        } else {
            model = {
                paths: {
                    lineAB: new makerjs.paths.Line(pointA, pointB),
                    lineBC: new makerjs.paths.Line(pointB, pointC),
                    lineCD: new makerjs.paths.Line(pointC, pointD),
                    lineDE: new makerjs.paths.Line(pointD, pointE),
                    lineEF: new makerjs.paths.Line(pointE, pointF),
                    lineFG: new makerjs.paths.Line(pointF, pointG),
                    lineGH: new makerjs.paths.Line(pointG, pointH),
                    lineHA: new makerjs.paths.Line(pointH, pointA)
                }
            }
        }
        

        if (!key.skipOrientationFix && key.height > key.width) {
            model = makerjs.model.rotate(model, -90)
        } 
        
        return model;
    }
}