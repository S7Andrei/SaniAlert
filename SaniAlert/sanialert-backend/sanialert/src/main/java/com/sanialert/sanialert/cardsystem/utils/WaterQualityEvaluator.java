package com.sanialert.sanialert.cardsystem.utils;

import com.sanialert.sanialert.cardsystem.model.ParameterQuality;
import com.sanialert.sanialert.cardsystem.model.WaterQualityStatus;

import java.util.Arrays;
import java.util.List;

public class WaterQualityEvaluator {

    public static ParameterQuality evaluateTurbidity(Double turbidity) {
        if (turbidity == null) {
            return null;
        }

        if (turbidity >= 0 && turbidity <= 1) {
            return ParameterQuality.GOOD;
        } else if (turbidity > 1 && turbidity <= 5) {
            return ParameterQuality.REGULAR;
        } else {
            return ParameterQuality.CRITICAL;
        }
    }

    public static ParameterQuality evaluateDissolvedOxygen(Double dissolvedOxygen) {
        if (dissolvedOxygen == null) {
            return null;
        }

        if (dissolvedOxygen >= 5) {
            return ParameterQuality.GOOD;
        } else if (dissolvedOxygen > 3 && dissolvedOxygen < 5) {
            return ParameterQuality.REGULAR;
        } else {
            return ParameterQuality.CRITICAL;
        }
    }

    public static ParameterQuality evaluateHeavyMetals(Boolean heavyMetalsPresent, Double level) {
        if (heavyMetalsPresent == null || !heavyMetalsPresent) {
            return ParameterQuality.GOOD;
        }

        if (level == null) {
            return null;
        }

        if (level <= 0.0009) {
            return ParameterQuality.GOOD;
        } else if (level > 0.0009 && level <= 0.05) {
            return ParameterQuality.REGULAR;
        } else {
            return ParameterQuality.CRITICAL;
        }
    }

    public static ParameterQuality evaluateResidues(Boolean residuesDetected) {
        if (residuesDetected == null) {
            return null;
        }

        return residuesDetected ? ParameterQuality.CRITICAL : ParameterQuality.GOOD;
    }

    public static ParameterQuality evaluatePh(Double ph) {
        if (ph == null || ph < 0) {
            return null;
        }

        if (ph >= 6.5 && ph <= 8.5) {
            return ParameterQuality.GOOD;
        } else if ((ph >= 6.0 && ph < 6.5) || (ph > 8.5 && ph <= 9.0)) {
            return ParameterQuality.REGULAR;
        } else {
            return ParameterQuality.CRITICAL;
        }
    }

    public static WaterQualityStatus determineOverallStatus(ParameterQuality... qualities) {
        List<ParameterQuality> qualityList = Arrays.asList(qualities);

        long nonGoodCount = qualityList.stream()
                .filter(q -> q != null && q != ParameterQuality.GOOD)
                .count();

        if (nonGoodCount == 0) {
            return WaterQualityStatus.GOOD;
        } else if (nonGoodCount <= 2) {
            return WaterQualityStatus.REGULAR;
        } else {
            return WaterQualityStatus.CRITICAL;
        }
    }
}
