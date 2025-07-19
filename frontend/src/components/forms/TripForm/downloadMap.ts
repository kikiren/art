import html2canvas from 'html2canvas-pro';

const downloadMap = () => {

    const mapElement = document.querySelector('#newTripPreview') as HTMLElement | null;

    if (!mapElement) {
        console.error('Map container not found.');
        return;
    }

    html2canvas(mapElement, {
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: true,
        scale: 3,
    }).then((canvas) => {
        const dataUrl = canvas.toDataURL('image/jpeg', 1);
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'map.jpg';
        link.click();
    }).catch((error) => {
        console.error('Failed to download map:', error);
    });

};


export default downloadMap;