import Decimal from 'decimal.js'
import makerjs from 'makerjs'
import { CutoutGenerator } from './CutoutGenerator'

// Basic MX switch cutout
// Simple filleted square of 14mm size

export class SwitchMX5mm extends CutoutGenerator {

    generate(key, generatorOptions) {

        const width = new Decimal("14")
        const height = new Decimal("14")
        const plusHalfWidth = width.dividedBy(new Decimal("2"))
        const minsHalfWidth = width.dividedBy(new Decimal("-2"))
        const plusHalfHeight = height.dividedBy(new Decimal("2"))
        const minsHalfHeight = height.dividedBy(new Decimal("-2"))

        const clipWidth = new Decimal("7")
        const clipHeight = new Decimal("16")
        const plusHalfClipWidth = clipWidth.dividedBy(new Decimal("2"))
        const minsHalfClipWidth = clipWidth.dividedBy(new Decimal("-2"))
        const plusHalfClipHeight = clipHeight.dividedBy(new Decimal("2"))
        const minsHalfClipHeight = clipHeight.dividedBy(new Decimal("-2"))
        
        /*
                K----J
                |    |
            A---L    I---H
            |            |
            |            |
            |            |
            |            |
            B---C    F---G
                |    |
                D----E
        */

        let pointA = [minsHalfWidth.plus(generatorOptions.kerf).toNumber(), plusHalfHeight.minus(generatorOptions.kerf).toNumber()]
        let pointB = [minsHalfWidth.plus(generatorOptions.kerf).toNumber(), minsHalfHeight.plus(generatorOptions.kerf).toNumber()]
        let pointC = [minsHalfClipWidth.plus(generatorOptions.kerf).toNumber(), minsHalfHeight.plus(generatorOptions.kerf).toNumber()]
        let pointD = [minsHalfClipWidth.plus(generatorOptions.kerf).toNumber(), minsHalfClipHeight.plus(generatorOptions.kerf).toNumber()]
        let pointE = [plusHalfClipWidth.minus(generatorOptions.kerf).toNumber(), minsHalfClipHeight.plus(generatorOptions.kerf).toNumber()]
        let pointF = [plusHalfClipWidth.minus(generatorOptions.kerf).toNumber(), minsHalfHeight.plus(generatorOptions.kerf).toNumber()]
        let pointG = [plusHalfWidth.minus(generatorOptions.kerf).toNumber(), minsHalfHeight.plus(generatorOptions.kerf).toNumber()]
        let pointH = [plusHalfWidth.minus(generatorOptions.kerf).toNumber(), plusHalfHeight.minus(generatorOptions.kerf).toNumber()]
        let pointI = [plusHalfClipWidth.minus(generatorOptions.kerf).toNumber(), plusHalfHeight.minus(generatorOptions.kerf).toNumber()]
        let pointJ = [plusHalfClipWidth.minus(generatorOptions.kerf).toNumber(), plusHalfClipHeight.minus(generatorOptions.kerf).toNumber()]
        let pointK = [minsHalfClipWidth.plus(generatorOptions.kerf).toNumber(), plusHalfClipHeight.minus(generatorOptions.kerf).toNumber()]
        let pointL = [minsHalfClipWidth.plus(generatorOptions.kerf).toNumber(), plusHalfHeight.minus(generatorOptions.kerf).toNumber()]
        
        var model = {
            paths: {
                lineAB: new makerjs.paths.Line(pointA, pointB),
                lineBC: new makerjs.paths.Line(pointB, pointC),
                lineCD: new makerjs.paths.Line(pointC, pointD),
                lineDE: new makerjs.paths.Line(pointD, pointE),
                lineEF: new makerjs.paths.Line(pointE, pointF),
                lineFG: new makerjs.paths.Line(pointF, pointG),
                lineGH: new makerjs.paths.Line(pointG, pointH),
                lineHI: new makerjs.paths.Line(pointH, pointI),
                lineIJ: new makerjs.paths.Line(pointI, pointJ),
                lineJK: new makerjs.paths.Line(pointJ, pointK),
                lineKL: new makerjs.paths.Line(pointK, pointL),
                lineLA: new makerjs.paths.Line(pointL, pointA),
            }
        }

        if (generatorOptions.switchFilletRadius.gt(0)) {

            const filletNum = generatorOptions.switchFilletRadius.toNumber() 

            var filletTopLeft = makerjs.path.fillet(model.paths.lineAB, model.paths.lineLA, filletNum)
            var filletTopRight = makerjs.path.fillet(model.paths.lineGH, model.paths.lineHI, filletNum)
            var filletBottomLeft = makerjs.path.fillet(model.paths.lineAB, model.paths.lineBC, filletNum)
            var filletBottomRight = makerjs.path.fillet(model.paths.lineFG, model.paths.lineGH, filletNum)
            
            model.paths.filletTopLeft = filletTopLeft;
            model.paths.filletTopRight = filletTopRight;
            model.paths.filletBottomLeft = filletBottomLeft;
            model.paths.filletBottomRight = filletBottomRight;

        }

        if (!key.skipOrientationFix && key.height > key.width) {
            model = makerjs.model.rotate(model, -90)
        } 
        
        return model;
    }
}