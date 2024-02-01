import { useEffect, useState } from 'react';
import Axios from 'axios';
import { PuffLoader } from 'react-spinners';
import Select from 'react-select';

import './style.css';

const TranslateEditor = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [languageList, setLanguageList] = useState([]);
    const [options, setOptions] = useState([]);
    const [availableTargetLanguageList, setAvailableTargetLanguageList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sourceLanguageCode, setSourceLanguageCode] = useState('auto');
    const [targetLanguageCode, setTargetLanguageCode] = useState('');
    const [detectedLanguage, setDetectedLanguage] = useState(null);

    const styles = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    useEffect(() => {
        if (languageList.length === 0) {
            fetchLanguages();
        }
        const delayDebounceFn = setTimeout(() => {
            if (input && sourceLanguageCode && targetLanguageCode)
                translate(input);
        }, 300);

        return () => clearTimeout(delayDebounceFn)
    }, [input, sourceLanguageCode, targetLanguageCode]);

    const fetchLanguages = () => {
        Axios.get(`http://localhost:8080/api/v1/translate/languages`).then((res) => {
            let languages = res.data
            let options = [{ value: 'auto', label: 'Auto Detect' }];
            languages.forEach(language => {
                const option = { value: language.code, label: language.name };
                options.push(option);
            });
            setOptions(options);
            setLanguageList(res.data);
        }).catch(error => console.log("Fetch language list error: ", error));
    }

    const selectSourceLanguage = (option) => {
        setSourceLanguageCode(option.value);
        getAvailableTargetLanguages(option.value);
    }

    const getAvailableTargetLanguages = (sourceLanguageCode) => {
        const filteredLanguage = languageList.find((language) => language.code === sourceLanguageCode);
        const targetList = filteredLanguage?.targets;
        if(targetList){
            const availabeTarget = targetList.map(t => ({value: t, label: findLanguege(t)}))
            setAvailableTargetLanguageList(availabeTarget);
        }
        else setAvailableTargetLanguageList(options);
    }

    const selectTargetLanguage = (option) => {
        setTargetLanguageCode(option.value);
    }

    const translate = (text) => {
        if (text) {
            setLoading(true);
            Axios.post(`http://localhost:8080/api/v1/translate`, {
                q: input,
                source: sourceLanguageCode,
                target: targetLanguageCode,
                format: "text",
                api_key: ""
            }).then((res) => {
                let result = res.data.translatedText;
                setOutput(result);
                let detectedLanguage = res.data.detectedLanguage;
                if(detectedLanguage){
                    setDetectedLanguage(res.data.detectedLanguage);
                }
            }).then(() => {
                setLoading(false);
            }).catch((error) => {
                setLoading(false);
                console.log(error);
                alert("Service maybe unavailable. Please try later!");
            });
        }
    }

    const findLanguege = (code) => {
        const filteredLanguage = languageList.find((language) => language.code === code);
        return filteredLanguage.name;
    }

    return (
        <div>
            <h1 className="alert alert-success" align="center">LANGUAGE TRANSLATOR</h1>
            <div className='main'>
                <div className='source-container'>
                    <h3>SELECT SOURCE LANGUAGE</h3>
                    <Select options={options} onChange={selectSourceLanguage} />
                    <textarea className='text-area' onChange={(e) => setInput(e.target.value)}></textarea>
                    {detectedLanguage && <p>Detect Language: <b>{findLanguege(detectedLanguage.language)}</b> with confidence: <b>{detectedLanguage.confidence}</b></p>}
                </div>
                <div className='middle-container' style={styles}>
                    <PuffLoader loading={loading} color='black' />
                </div>
                <div className='target-container'>
                    <h3>SELECT TARGET LANGUAGE</h3>
                    <Select options={availableTargetLanguageList} onChange={selectTargetLanguage} />
                    <textarea className='text-area' value={output} readOnly={true}></textarea>
                </div>
            </div>
        </div>
    );
}

export default TranslateEditor;