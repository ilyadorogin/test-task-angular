import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-text-parsing',
  templateUrl: './text-parsing.component.html',
  styleUrls: ['./text-parsing.component.scss']
})
export class TextParsingComponent implements OnInit {

  text = ' Mary had     a little lamb .\n' +
    'Peter called for the wolf , and Aesop came .\n' +
    'Cinderella likes shoes.  ';
  textArray: Array<Array<string>>;

  constructor() {
    this.textArray = this.textToArr(this.text);
  }

  ngOnInit() {
  }

  textToXML(text: string): string {  // string to XML parser
    let result = '<?xml version="1.0"; encoding="UTF-8" standalone="yes">\n' +
      '<text>\n';

    const sentences = this.splitSentences(text);
    for (let i = 0; i < sentences.length; i++) {
      let res = '';
      const words = this.splitWords(sentences[i]);
      this.sortWords(words);
      for (let j = 0; j < words.length; j++) {
        res += this.wordInXML(words[j]);
      }
      result += this.sentenceInXML(res);
    }

    result += '\n<\/text>';
    return result;
  }

  textArrayToXML(text: Array<Array<string>>): string {    // parsing text Array to XML
    let result = '<?xml version="1.0"; encoding="UTF-8" standalone="yes">\n' +
      '<text>\n';
    for (let i = 0; i < text.length; i++) {
      let res = '';
      this.sortWords(text[i]);  // sorting words in scentences
      for (let j = 0; j < text[i].length; j++) {
        res += this.wordInXML(text[i][j]);  // adding word
      }
      result += this.sentenceInXML(res);  // adding scentence
    }
    result += '\n<\/text>';
    return result;
  }

  textArrayToCSV(text: Array<Array<string>>): string { // parsing text Array to CSV
    let result = '';
    for (let i = 0; i < text.length; i++) {
      let res = 'Sentence ' + (i + 1);
      this.sortWords(text[i]);
      for (let j = 0; j < text[i].length; j++) {
        res += this.wordInCSV(text[i][j]);
      }
      result += res + '\n';
    }
    return result;
  }

  changeTextArray() {   // input onChange listner making array from text to parse to both formats XML and CSV
    this.textArray = this.textToArr(this.text);
  }

  textToArr(text: string): Array<Array<string>> {   // string to array of words arrays
    const result = [];
    const sentences = this.splitSentences(text);  // splitting text by sentences
    for (let i = 0; i < sentences.length; i++) {
      result.push(this.splitWords(sentences[i])); // splitting sentence by words
    }
    return result;
  }

  sortWords(wordsArray: Array<string>) {  // sorting words in sentences
    wordsArray.sort(function(a, b) {
      const wordA = a.toLowerCase();
      const wordB = b.toLowerCase();
      if (wordA < wordB) {
        return -1;
      }
      if (wordA > wordB) {
        return 1;
      }
      return 0;
    });
  }

  splitWords(sentence: string): Array<string> {   // splitting sentence by words
    return sentence.split(' ');
  }

  splitSentences(text: string): Array<string> {   // splitting text by sentences
    return text.replace(/[,;\n]/g, ' ')
      .replace(/ +/g, ' ')
      .replace(/[!\?]/g, '.')
      .replace(/ ?\.+ ?/g, '.')
      .replace(/^ |\.$/g, '')
      .split('.');
  }

  wordInXML(word: string): string {   // word to XML format
    return '\t\t<word>' + word + '<\/word>\n';
  }

  wordInCSV(word: string): string {   // word to CSV format
    return ', ' + word;
  }

  sentenceInXML(sentence: string): string {   // sentence to XML format
    return '\t<sentence>\n' + sentence + '\t<\/sentence>\n';
  }

}
