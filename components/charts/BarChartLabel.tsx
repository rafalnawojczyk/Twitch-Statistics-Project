const BarChartLabel = ({ active, payload, label, onMouse }) => {
    if (active && payload && payload.length) {
        onMouse(payload[0].payload.name, +payload[0].payload.value);
    }

    return null;
};

export default BarChartLabel;
