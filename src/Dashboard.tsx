import { useState } from 'react';
import {
    Container,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Dashboard() {
    const [monthlyContribution, setMonthlyContribution] = useState('');
    const [currentAge, setCurrentAge] = useState('');
    const [retirementAge, setRetirementAge] = useState('67');
    const [annualReturn, setAnnualReturn] = useState('');
    const [inflation, setInflation] = useState('');
    const [currentSavings, setCurrentSavings] = useState('');
    const [result, setResult] = useState<{
        futureValue: number;
        realValue: number;
        totalContributions: number;
        investmentGrowth: number;
        years: number;
        monthlyPensionPayout?: number;
    } | null>(null);

    const [errors, setErrors] = useState<{
        monthlyContribution?: string;
        currentAge?: string;
        retirementAge?: string;
        annualReturn?: string;
        inflation?: string;
        currentSavings?: string;
    }>({});

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const validate = () => {
        const newErrors: typeof errors = {};

        const monthly = parseFloat(monthlyContribution);
        if (isNaN(monthly) || monthly <= 0) {
            newErrors.monthlyContribution = 'Voer een geldig bedrag in groter dan 0';
        }

        const age = parseInt(currentAge);
        if (isNaN(age) || age <= 0) {
            newErrors.currentAge = 'Voer een geldige leeftijd in groter dan 0';
        }

        const retireAge = parseInt(retirementAge);
        if (isNaN(retireAge) || retireAge <= age) {
            newErrors.retirementAge = 'Pensioenleeftijd moet hoger zijn dan uw leeftijd';
        }

        const ar = parseFloat(annualReturn);
        if (isNaN(ar)) {
            newErrors.annualReturn = 'Voer een geldig percentage in voor jaarlijks rendement';
        }

        const inf = parseFloat(inflation);
        if (isNaN(inf)) {
            newErrors.inflation = 'Voer een geldig percentage in voor inflatie';
        }

        if (currentSavings) {
            const cs = parseFloat(currentSavings);
            if (isNaN(cs) || cs < 0) {
                newErrors.currentSavings = 'Voer een geldig bedrag in (0 of hoger)';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCalculate = () => {
        setHasSubmitted(true);
        const formIsValid = validate();
        setIsValid(formIsValid);

        if (!formIsValid) {
            setResult(null);
            return;
        }

        const monthly = parseFloat(monthlyContribution);
        const age = parseInt(currentAge);
        const retireAge = parseInt(retirementAge);
        const yearsTillPension = retireAge - age;

        const rate = parseFloat(annualReturn) / 100 / 12;
        const infl = parseFloat(inflation) / 100;
        const start = parseFloat(currentSavings) || 0;

        if (yearsTillPension <= 0) {
            setResult(null);
            return;
        }

        const months = yearsTillPension * 12;

        const fvContributions = monthly * (((1 + rate) ** months - 1) / rate) * (1 + rate);
        const fvStart = start * (1 + rate) ** months;
        const futureValue = fvContributions + fvStart;

        const realValue = futureValue / (1 + infl) ** yearsTillPension;
        const totalContributions = monthly * months + start;
        const investmentGrowth = futureValue - totalContributions;

        const retirementPayoutYears = 20;
        const monthlyPensionPayout = futureValue / (retirementPayoutYears * 12);

        setResult({
            futureValue,
            realValue,
            totalContributions,
            investmentGrowth,
            years: yearsTillPension,
            monthlyPensionPayout,
        });
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Typography variant="h4" gutterBottom>
                Pensioenberekening
            </Typography>

            <Card>
                <CardContent>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Maandelijkse inleg (€)"
                            type="number"
                            value={monthlyContribution}
                            onChange={(e) => setMonthlyContribution(e.target.value)}
                            error={hasSubmitted && !!errors.monthlyContribution}
                            helperText={hasSubmitted && errors.monthlyContribution}
                            fullWidth
                        />

                        <TextField
                            label="Huidige leeftijd"
                            type="number"
                            value={currentAge}
                            onChange={(e) => setCurrentAge(e.target.value)}
                            error={hasSubmitted && !!errors.currentAge}
                            helperText={hasSubmitted && errors.currentAge}
                            fullWidth
                        />

                        <TextField
                            label="Pensioenleeftijd"
                            type="number"
                            value={retirementAge}
                            onChange={(e) => setRetirementAge(e.target.value)}
                            error={hasSubmitted && !!errors.retirementAge}
                            helperText={hasSubmitted && errors.retirementAge}
                            fullWidth
                        />

                        <TextField
                            label="Verwacht jaarlijks rendement (%)"
                            type="number"
                            value={annualReturn}
                            onChange={(e) => setAnnualReturn(e.target.value)}
                            error={hasSubmitted && !!errors.annualReturn}
                            helperText={hasSubmitted && errors.annualReturn}
                            fullWidth
                        />

                        <TextField
                            label="Verwachte inflatie (%)"
                            type="number"
                            value={inflation}
                            onChange={(e) => setInflation(e.target.value)}
                            error={hasSubmitted && !!errors.inflation}
                            helperText={hasSubmitted && errors.inflation}
                            fullWidth
                        />

                        <TextField
                            label="Huidig pensioenvermogen (€)"
                            type="number"
                            value={currentSavings}
                            onChange={(e) => setCurrentSavings(e.target.value)}
                            error={hasSubmitted && !!errors.currentSavings}
                            helperText={hasSubmitted && errors.currentSavings}
                            fullWidth
                        />

                        <Button
                            variant="contained"
                            color={hasSubmitted && !isValid ? 'error' : 'primary'}
                            onClick={handleCalculate}
                        >
                            Bereken
                        </Button>

                        {hasSubmitted && !isValid && (
                            <Typography color="error" mt={1}>
                                Vul alstublieft alle verplichte velden correct in.
                            </Typography>
                        )}

                        {result && (
                            <Box mt={4}>
                                <Typography variant="h6" gutterBottom>
                                    Geschatte maandelijkse pensioenuitkering: €{result.monthlyPensionPayout?.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </Typography>
                                <Accordion sx={{ mt: 2 }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>Meer details</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Totale pensioenwaarde: €{result.futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                        </Typography>
                                        <Typography sx={{ mt: 1, mb: 2 }}>
                                            Waarde na inflatie (in koopkracht van vandaag): €{result.realValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                        </Typography>
                                        <Typography>
                                            Totale inleg: €{result.totalContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                        </Typography>
                                        <Typography>
                                            Beleggingsgroei: €{result.investmentGrowth.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                        </Typography>
                                        <Typography>
                                            Looptijd: {result.years} jaar
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}
