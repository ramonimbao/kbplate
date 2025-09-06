import Decimal from 'decimal.js'
import makerjs from 'makerjs'
import { CutoutGenerator } from './CutoutGenerator'

// Deskeys stabilizer cutout

export class StabilizerDeskeys extends CutoutGenerator {

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
        const width = new Decimal("13.462")
        const height = new Decimal("13.741")
        const innerWidth = new Decimal("12.448")
        const innerHeight = new Decimal("12.727")

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

        var singleCutout = {
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

        const stabWidth = new Decimal("32.15")
        const stabHeight = new Decimal("14.1")
        const stabInnerWidthUpper = new Decimal("30")
        const stabInnerWidthLower = new Decimal("26")
        const stabInnerHeight = new Decimal("11.50")

        const stabPlusHalfWidth = stabWidth.dividedBy(new Decimal("2"))
        const stabMinsHalfWidth = stabWidth.dividedBy(new Decimal("-2"))
        const stabPlusHalfHeight = stabHeight.dividedBy(new Decimal("2"))
        const stabMinsHalfHeight = stabHeight.dividedBy(new Decimal("-2"))

        const stabPlusHalfInnerWidthUpper = stabInnerWidthUpper.dividedBy(new Decimal("2"))
        const stabMinsHalfInnerWidthUpper = stabInnerWidthUpper.dividedBy(new Decimal("-2"))
        const stabPlusHalfInnerWidthLower = stabInnerWidthLower.dividedBy(new Decimal("2"))
        const stabMinsHalfInnerWidthLower = stabInnerWidthLower.dividedBy(new Decimal("-2"))
        const stabPlusHalfInnerHeight = stabInnerHeight.dividedBy(new Decimal("2"))
        const stabMinsHalfInnerHeight = stabInnerHeight.dividedBy(new Decimal("-2"))

        //    B_____C
        // A /      \ D
        //  |        |
        //  |        |
        // H \______/ E
        //    G     F

        let stabPointA = [stabMinsHalfWidth.plus(generatorOptions.kerf).toNumber(), stabPlusHalfInnerHeight.minus(generatorOptions.kerf).plus(0.25).toNumber()]
        let stabPointB = [stabMinsHalfInnerWidthUpper.plus(generatorOptions.kerf).toNumber(), stabPlusHalfHeight.minus(generatorOptions.kerf).toNumber()]
        let stabPointC = [stabPlusHalfInnerWidthUpper.minus(generatorOptions.kerf).toNumber(), stabPlusHalfHeight.minus(generatorOptions.kerf).toNumber()]
        let stabPointD = [stabPlusHalfWidth.minus(generatorOptions.kerf).toNumber(), stabPlusHalfInnerHeight.minus(generatorOptions.kerf).plus(0.25).toNumber()]
        let stabPointE = [stabPlusHalfWidth.minus(generatorOptions.kerf).toNumber(), stabMinsHalfInnerHeight.plus(generatorOptions.kerf).plus(0.25).toNumber()]
        let stabPointF = [stabPlusHalfInnerWidthLower.minus(generatorOptions.kerf).toNumber(), stabMinsHalfHeight.plus(generatorOptions.kerf).toNumber()]
        let stabPointG = [stabMinsHalfInnerWidthLower.plus(generatorOptions.kerf).toNumber(), stabMinsHalfHeight.plus(generatorOptions.kerf).toNumber()]
        let stabPointH = [stabMinsHalfWidth.plus(generatorOptions.kerf).toNumber(), stabMinsHalfInnerHeight.plus(generatorOptions.kerf).plus(0.25).toNumber()]

        var stabCutout = {
            paths: {
                lineAB: new makerjs.paths.Line(stabPointA, stabPointB),
                lineBC: new makerjs.paths.Line(stabPointB, stabPointC),
                lineCD: new makerjs.paths.Line(stabPointC, stabPointD),
                lineDE: new makerjs.paths.Line(stabPointD, stabPointE),
                lineEF: new makerjs.paths.Line(stabPointE, stabPointF),
                lineFG: new makerjs.paths.Line(stabPointF, stabPointG),
                lineGH: new makerjs.paths.Line(stabPointG, stabPointH),
                lineHA: new makerjs.paths.Line(stabPointH, stabPointA)
            }
        }

        var cutoutLeft = singleCutout;
        var cutoutRight = makerjs.model.clone(singleCutout);

        cutoutLeft = makerjs.model.move(cutoutLeft, [stab_spacing_left.times(-1).toNumber(), 0.13])
        cutoutRight = makerjs.model.move(cutoutRight, [stab_spacing_right.toNumber(), 0.13])

        let cutouts = {};
        if (keySize.lt(3)) {
            cutouts = {
                models: {
                    "stab": stabCutout
                }
            }
        } else {
            cutouts = {
                models: {
                    "left": cutoutLeft,
                    "right": cutoutRight
                }
            }
        }

        if (!key.skipOrientationFix && key.height > key.width) {
            cutouts = makerjs.model.rotate(cutouts, -90)
        } 
        
        return cutouts;
    }
}
