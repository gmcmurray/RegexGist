# Regex for email verification


## Summary

Regex is shorthand for Regular Expression which is an Object used in  in many programming languages in applications for detecting text patterns in strings.  This tutorial will review a basic Regex application for email validation using Javascript.

There are two aspects of Regex which will be covered in this tutorial.
First we review the regular expression object and it's syntax and secondly a brief introduction to the methods associated with the regular expression object. 

For the tutorial a Regular Expression validating email formats will be used.  The goal for this Regex application is to detect the existence of three substrings separated be a single "@" and another "." character in the submited email.  The text prior to "@" is called the email prefix, while the text to right of "@" is the email domain.  


## Table of Contents
- [Regex Components](#background)
- [Anchors](#anchors)
- [Quantifiers](#quantifiers)
- [Grouping Constructs](#grouping-constructs)
- [Character Classes](#character-classes)
- [Character Escapes](#character-escapes)
- [Putting It All Together](#puttingitalltogether)
- [Testing](#testing)
- [Additional Resources](#additionalresources)
- [About Author](#aboutauthor)

---------------

<br>

## Regex Components <a id=background></a>

<br>

The regular expression is an object which is a composition of constraints that define a  pattern which can be used in text search applications.  Below is a simple example of a Regex expression used for email validation.

There are two common ways to define a regular expression. 

The literal creation of a regular expression.
 
```
1) const  reg_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

equivalently using a constructor function:

2) let reg_email = new RegExp(' ^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$ ');
 ```

The Regex instance called reg_email looks complicated, however we will be breaking down each component to reveal what the pattern being defined.  The Regex object has two built in methods which are exec() ,test() and the object works with string methods match(), matchAll(), replace(), replaceAll(), search() and split(). 

  We will use the test() method in this tutorial to show how reg_email can be used to detect valid email format.  This is a simple implementation and more complicated pattern testing can be customized as desired. 

  Below we are assigning the output of the test method to isValid.

```
3) let isValid = reg_email.test(input_email);
```
Where isValid is a boolean which is true when the input_email string complies with the regular expression rules setup in reg_email.
Regex expressions are flexible and allow for searching general patterns in a text string.   

The literal definition of a Regular expression starts and ends with a forward slash "/" highlighted in yellow font below. All accepted email formats will contain the characters "@" and ".". These are defined explicitly  in   reg_email (in green font) pattern.  

<span style="color:yellow">/</span>^\w+([\.-]?\w+)\*<span style="color:green">@</span>\w+([\.-]?\w+)\*( <span style="color:green">\\.</span>\w{2,3})+$<span style="color:yellow">/</span>

The "." character requires an escape backslash to define it as a character.  This is represnted "\\." 


Additional pattern definition elements are covered in subsequent sections. 

<br>

----------------
<br>

### Anchors  <a id=anchors></a>

<br>
We will use the declaration of reg_email as shown in equation 1.    The next characters inside the forward slashes are called Anchors and they define boundaries for the pattern being defined.  The "^" defines the beginning and "$" the end of the String. 

<span style="color:yellow">/</span><span style="color:red">^</span>\w+([\.-]?\w+)\*<span style="color:green">@</span>\w+([\.-]?\w+)\*(<span style="color:green">\\.</span>\w{2,3})+<span style="color:red">$</span><span style="color:yellow">/</span>

Other Anchors exist but are not used in this particular Regex expression <br>

---------
<br>

### Quantifiers  <a id=quantifiers></a>

<br>
Quantifiers define the number (or range) of characters that are to be matched.  Quantifiers characters substrings include *, +, ? , {num1,num2}. The * quantifier allows any number of matches (including 0 ) of the preceding subexpression.  The + quantifier looks for one or more matches  of the preceding subexpression. The ? matches the preceding subexpression 0 or 1 times.  The quantifier {num1,num2} provides a range for the length of occurences to be between num1 < num2.

In our expression we have several quantifier expressions (colored in aqua) and are preceded by an expression, in most cases this is "\w" which denotes any letter wild card.
The "\w+" is repeated four times and denotes that a substring should occur in this position composed of any letter and of any length.

The  "\w{2,3}" expression denotes a character string composed of letters of length between 2-3 characters.    

<span style="color:yellow">/</span><span style="color:red">^</span>
\w<span style="color:aqua">+</span>([\.-]<span style="color:aqua">?</span>
\w<span style="color:aqua">+</span>)\*<span style="color:green">@</span>
\w<span style="color:aqua">+</span>([\.-]
<span style="color:aqua">?</span>
\w<span style="color:aqua">+</span>)\*( <span style="color:green">\\.</span>
\w<span style="color:aqua">{2,3}</span>)+<span style="color:red">$</span><span style="color:yellow">/</span>

Note with a "+?" quantifier grouping this would force the match to exactly one occurence.

------
<br>

### Grouping Constructs <a id="grouping-constructs"></a>

<br>

Grouping Constructs are used to define subexpressions in the regular expression.  They are used in working with repeating subexpressions and along with quantifiers can target multiple instances of the subexpression.  They are also useful in clarifying code by grouping complex expressions.  

The grouped subexpression in our example are placed in between "(" and ")" or "[",  "]" brackets.  The () are denoted as capturing subexpressions while [] groups are used to find range of characters using hyphens (e.g. [a-g] is includes any char between a and g as a match) or a set of characters. For example the group [.-]
includes period and a hyphen.

Our reg_email we have three grouping Constructs designated in orange along with two nested subexpressions in [ ] which are denoted in  brown.  

<span style="color:yellow">/</span><span style="color:red">^</span>
\w<span style="color:aqua">+</span>
<span style="color:orange">(</span><span style="color:orange">[</span>\.-<span style="color:orange">]</span>? \w<span style="color:aqua">+</span>
<span style="color:orange">)</span>
\*<span style="color:green">@</span>
<span style="color:aqua">\w+</span>
<span style="color:orange">(</span>
<span style="color:orange">[</span> 
    \.-
<span style="color:orange">]</span>     
    ?
<span style="color:aqua">\w+</span>
<span style="color:orange">)</span>
\*
<span style="color:orange">(</span>
<span style="color:green">\\.</span>
<span style="color:aqua">\w{2,3}</span>
<span style="color:orange">)</span>
+<span style="color:red">$</span><span style="color:yellow">/</span>

<br>

------------------

<br>

### Character Classes  <a id= "character-classes"></a>

<br>

Character expressions are elements of a regex expression that  setup the characters or type of characters that are  being searched for.

Here is a quick summary of some of the character expressions:

. &nbsp; &nbsp;:  Looks for any character except a newline 

\w, \d, \s &nbsp; &nbsp;: Looks for a word character (alphanumeric or underscore) regardless of case, a digit 0-9 , and whitespace respectively.

\W, \D, \S &nbsp; &nbsp;: the negation of \w, \d, \s

[abc] &nbsp; &nbsp;: includes a letter which is a,b, or c

[0-9] &nbsp; &nbsp;: A digit between 0 and 9.

[.-] &nbsp; &nbsp;: includes any letter or hyphen.

<br>

-------------------------------------------------

<br>

### Character Escapes  <a id= "character-escapes"></a>

<br>

Some characters require an escape backslash in order that it not be confused for a quantifier or other reserved character in regex.  For example
the period character requires a backslash in front of it "\\.". This avoids any confusion with the "." quantifier for any character except a newline.

The backslash is called an escape character.   To identify the backslash itself in text then this is written as "\\\\" in the regex expression.

<br>


-------------------------------------------------

<br>

### Putting It All Together <a id= "puttingitalltogether"></a>

<br>

Lets put the complete expression together with what has been covered.  

Recall that the reg_email regex expression can be divided into two
parts : email prefix @ email domain which are covered in the following parsing of reg_email:

email prefix = \w+([\.-]?\w+)*

email domain =  \w+([\.-]?\w+)*(\\.\w{2,3})+ 

The email prefix starts with multiple word characters  "\w+"  followed by a sequence one or more one character or one hypen followed by multiple wordcharacters "([\.-]?\w+)"  which terminates on the @ character. This creates an allowable pattern of ab_cde-xwthsu-lakdjf ... in the prefix.  Only a single dash in a row is allowed due to the "?" character.

The email domain is composed of two parts separated by the "." character.  The subexpression before the "."  is the same as the email prefix, while the subexpression to the right of the "." is defined to be a sequence of 2-3 characters with a leading ".".  This is a result of the "(\\.\w{2,3})+" grouping expression enclosed by the "()" followed by the "+ " quantifier.
 
  Common 2-3 length substrings of this type in emails endings include : ".com",".edu", ".org" and ".de".

<br>

-----------------------

<br>

## Testing <a id= "testing"></a>

<br>

The following tests were run on the regex expression discussed:

![image info](./tests.png)


If you have difficulty viewing this in GitHub please open the tests.png file and view separately.

<br>

---------------------------

<br>


## Additional Resources on Regex <a id= "additionalresources"></a>

<br>



https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp

https://regexr.com/

<br>

--------------------------

<br>

## Author <a id= "aboutauthor"></a>

<br>

The author is a Full Stack student with the University of Washington BootCamp course and has extensive experience in Semiconductor Design, Development, Manufacturing Logistics and Quality.

My linked in profile can be found:

https://www.linkedin.com/in/george-mcmurray/

Email Contact Info:



gmcmurray1493@gmail.com

My github username is : gmcmurray

Thank You!

