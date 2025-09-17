import Decimal from 'decimal.js'
import makerjs from 'makerjs'
import { CutoutGenerator } from './CutoutGenerator'

// Basic MX stabilizer cutout

export class StabilizerMX5mm extends CutoutGenerator {

    generate(key, generatorOptions) {

        let keySize = key.width

        if (!key.skipOrientationFix && key.height > key.width) {
            keySize = key.height
        } 

        let stab_spacing_left = null
        let stab_spacing_right = null
        
        if (keySize.gte(8)) {
            stab_spacing_left = stab_spacing_right = new Decimal("66.675")
        }
        else if (keySize.gte(7)) {
            stab_spacing_left = stab_spacing_right = new Decimal("57.15")
        }
        else if (keySize.gte(6.25)) {
            stab_spacing_left = stab_spacing_right = new Decimal("50")
        }
        else if (keySize.gte(6)) {
            if (key.shift6UStabilizers) {
                stab_spacing_left = new Decimal("57.15")
                stab_spacing_right = new Decimal("38.1")
            } else {
                stab_spacing_left = stab_spacing_right = new Decimal("47.625")
            }
        }
        else if (keySize.gte(4.5)) {
            stab_spacing_left = stab_spacing_right = new Decimal("34.67")
        }
        else if (keySize.gte(3)) {
            stab_spacing_left = stab_spacing_right = new Decimal("19.05")
        }
        else if (keySize.gte(2)) {
            stab_spacing_left = stab_spacing_right = new Decimal("11.938")
        }
        else {
            return null
        }

        const width = new Decimal("7")
        const upperBound = new Decimal("9.75")
        const upperWire = new Decimal("-10.4")
        const lowerWire = new Decimal("-6.8")

        const plusHalfWidth = width.dividedBy(new Decimal("2"))
        const minsHalfWidth = width.dividedBy(new Decimal("-2"))

        /*
            A---H                               E---D   <-- upperBound
            |   |                               |   |
            |   |                               |   |
            |   |                               |   |
            |   G-------------------------------F   |   <-- upperWire
            |                                       |
            B---------------------------------------C   <-- lowerWire
        */
        
        let pointA = [minsHalfWidth.plus(stab_spacing_left).plus(generatorOptions.kerf).toNumber(), upperBound.minus(generatorOptions.kerf).toNumber()]
        let pointB = [minsHalfWidth.plus(stab_spacing_left).plus(generatorOptions.kerf).toNumber(), lowerWire.plus(generatorOptions.kerf).toNumber()]
        let pointC = [plusHalfWidth.minus(stab_spacing_right).minus(generatorOptions.kerf).toNumber(), lowerWire.plus(generatorOptions.kerf).toNumber()]
        let pointD = [plusHalfWidth.minus(stab_spacing_right).minus(generatorOptions.kerf).toNumber(), upperBound.minus(generatorOptions.kerf).toNumber()]
        let pointE = [minsHalfWidth.minus(stab_spacing_right).plus(generatorOptions.kerf).toNumber(), upperBound.minus(generatorOptions.kerf).toNumber()]
        let pointF = [minsHalfWidth.minus(stab_spacing_right).plus(generatorOptions.kerf).toNumber(), upperWire.plus(generatorOptions.kerf).toNumber()]
        let pointG = [plusHalfWidth.plus(stab_spacing_left).minus(generatorOptions.kerf).toNumber(), upperWire.plus(generatorOptions.kerf).toNumber()]
        let pointH = [plusHalfWidth.plus(stab_spacing_left).minus(generatorOptions.kerf).toNumber(), upperBound.minus(generatorOptions.kerf).toNumber()]

        var stabCutout = {
            paths: {
                lineAB: new makerjs.paths.Line(pointA, pointB),
                lineBC: new makerjs.paths.Line(pointB, pointC),
                lineCD: new makerjs.paths.Line(pointC, pointD),
                lineDE: new makerjs.paths.Line(pointD, pointE),
                lineEF: new makerjs.paths.Line(pointE, pointF),
                lineFG: new makerjs.paths.Line(pointF, pointG),
                lineGH: new makerjs.paths.Line(pointG, pointH),
                lineHA: new makerjs.paths.Line(pointH, pointA),
            }
        }

        if (generatorOptions.stabilizerFilletRadius.gt(0)) {

            const filletNum = generatorOptions.stabilizerFilletRadius.toNumber()

            var filletTopLeft = makerjs.path.fillet(stabCutout.paths.lineAB, stabCutout.paths.lineHA, filletNum)
            var filletTopRight = makerjs.path.fillet(stabCutout.paths.lineCD, stabCutout.paths.lineDE, filletNum)
            var filletBottomLeft = makerjs.path.fillet(stabCutout.paths.lineAB, stabCutout.paths.lineBC, filletNum)
            var filletBottomRight = makerjs.path.fillet(stabCutout.paths.lineBC, stabCutout.paths.lineCD, filletNum)
            var filletInnerLeft = makerjs.path.fillet(stabCutout.paths.lineGH, stabCutout.paths.lineHA, filletNum)
            var filletInnerRight = makerjs.path.fillet(stabCutout.paths.lineDE, stabCutout.paths.lineEF, filletNum)
            
            stabCutout.paths.filletTopLeft = filletTopLeft;
            stabCutout.paths.filletTopRight = filletTopRight;
            stabCutout.paths.filletBottomLeft = filletBottomLeft;
            stabCutout.paths.filletBottomRight = filletBottomRight;
            stabCutout.paths.filletInnerLeft = filletInnerLeft;
            stabCutout.paths.filletInnerRight = filletInnerRight;

        }
        let cutouts = {
            models: {
                "stab": stabCutout
            }
        }

        if (!key.skipOrientationFix && key.height > key.width) {
            cutouts = makerjs.model.rotate(cutouts, -90)
        } 
        
        return cutouts;
    }
}
