var HolderIpsum = (function () {
    'use strict';

    // DOM constants

    var DATA_ATTRIBUTE_PREFIX = 'data-holder-ipsum-';

    var DATA_ATTRIBUTE_PREFIX_LENGTH = DATA_ATTRIBUTE_PREFIX.length;

    //IE8 patches
    if (!('indexOf' in Array.prototype)) {
        Array.prototype.indexOf = function(find, i /*opt*/) {
            if (i===undefined) {
                i = 0;
            }
            if (i<0) {
                i+= this.length;
            }
            if (i<0) {
                i = 0;
            }
            for (var n=this.length; i<n; i++) {
                if (i in this && this[i] === find) {
                    return i;
                }
            }
            return -1;
        };
    }
    if (!('forEach' in Array.prototype)) {
        Array.prototype.forEach = function(action, that /*opt*/) {
            for (var i=0, n=this.length; i<n; i++) {
                if (i in this) {
                    action.call(that, this[i], i, this);
                }
            }
        };
    }

    // Shorthand
    var iterate = Array.prototype.forEach;

    // Data

    var COMMON_PARAGRAPH = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

    var WORDS = 'exercitationem,perferendis,perspiciatis,laborum,eveniet,sunt,iure,nam,nobis,eum,cum,officiis,excepturi,odio,consectetur,quasi,aut,quisquam,vel,eligendi,itaque,non,odit,tempore,quaerat,dignissimos,facilis,neque,nihil,expedita,vitae,vero,ipsum,nisi,animi,cumque,pariatur,velit,modi,natus,iusto,eaque,sequi,illo,sed,ex,et,voluptatibus,tempora,veritatis,ratione,assumenda,incidunt,nostrum,placeat,aliquid,fuga,provident,praesentium,rem,necessitatibus,suscipit,adipisci,quidem,possimus,voluptas,debitis,sint,accusantium,unde,sapiente,voluptate,qui,aspernatur,laudantium,soluta,amet,quo,aliquam,saepe,culpa,libero,ipsa,dicta,reiciendis,nesciunt,doloribus,autem,impedit,minima,maiores,repudiandae,ipsam,obcaecati,ullam,enim,totam,delectus,ducimus,quis,voluptates,dolores,molestiae,harum,dolorem,quia,voluptatem,molestias,magni,distinctio,omnis,illum,dolorum,voluptatum,ea,quas,quam,corporis,quae,blanditiis,atque,deserunt,laboriosam,earum,consequuntur,hic,cupiditate,quibusdam,accusamus,ut,rerum,error,minus,eius,ab,ad,nemo,fugit,officia,at,in,id,quos,reprehenderit,numquam,iste,fugiat,sit,inventore,beatae,repellendus,magnam,recusandae,quod,explicabo,doloremque,aperiam,consequatur,asperiores,commodi,optio,dolor,labore,temporibus,repellat,veniam,architecto,est,esse,mollitia,nulla,a,similique,eos,alias,dolore,tenetur,deleniti,porro,facere,maxime,corrupti'.split(',');

    var COMMON_WORDS = 'lorem,ipsum,dolor,sit,amet,consectetur,adipisicing,elit,sed,do,eiusmod,tempor,incididunt,ut,labore,et,dolore,magna,aliqua'.split(',');

    // Main lorem-ipsum functionality

    /**
     * Generate a sentence of varying length with a varying number of
     * sub-clauses of lorem-ipsum text.
     */
    var generate_sentence = function () {
        // Determine the number of comma-separated sections and number of words
        // in each section for this sentence.
        var sections = [];
        for (var index=get_random_integer(1, 5); index>=0; index-=1) {
            var sample_words_count = get_random_integer(3, 12);
            var sample_words = select_sample_from_population(WORDS, sample_words_count);
            var sample_section = sample_words.join(' ');
            sections.push(sample_section);
        }
        var sentence = sections.join(', ');
        var sentence_end = '.?'.substr(get_random_integer(0, 1), 1);
        return sentence.substr(0, 1).toUpperCase() + sentence.substr(1) + sentence_end;
    };


    /**
     * Generate a paragraph consisting of between 1 and 4 sentences, inclusive.
     */
    var generate_paragraph = function () {
        var sentences = [];
        for (var index=get_random_integer(1, 4); index>=0; index-=1) {
            sentences.push(generate_sentence());
        }
        return sentences.join(' ');
    };

    /**
     * Generate an array of paragraphs.
     *
     * If `suppress_common` is false, then the first paragraph will be the
     * standard 'lorem-ipsum' paragraph.
     *
     */
    var generate_paragraphs = function (paragraph_count, suppress_common) {
        var paragraphs = [];
        for (var index=0; index<paragraph_count; index+=1) {
            if (index === 0 && !suppress_common) {
                paragraphs.push(COMMON_PARAGRAPH);
            } else {
                paragraphs.push(generate_paragraph());
            }
        }
        return paragraphs;
    };

    /**
     * Generate ``word_count`` lorem ipsum words separated by a single space.
     *
     * If ``suppress_common`` is false the first 19 words will be the standard
     * 'lorem-ipsum' words. Otherwise, all words will be selected randomly.
     */
    var generate_words = function (word_count, suppress_common) {
        var words = [];
        if (!suppress_common) {
            words = words.concat(COMMON_WORDS);
        }
        var current_word_count = words.length;
        var remaining_words_required = word_count - current_word_count;
        if (0 < remaining_words_required) {
            var random_words = select_sample_from_population(
                WORDS,
                remaining_words_required
            );
            words = words.concat(random_words);
        } else {
            words = words.slice(0, word_count);
        }

        return words.join(' ');
    };

    // Utilities

    var get_random_integer = function (min, max) {
        return Math.round((Math.random() * (max - min)) + min);
    };

    var select_sample_from_population = function (population, sample_size) {
        var population_size = population.length;
        if (population_size <= sample_size) {
            throw new Error('Sample size is larger than population size');
        } else if (sample_size <= 0) {
            throw new Error('Must have a smaple size of at least 1');
        }

        var get_population_index = function () {
            return get_random_integer(0, population_size - 1);
        };
        var sampled_elements = [];
        var selected_indices = [];
        for (var index=0; index<sample_size; index+=1) {
            var population_index = get_population_index();
            while (selected_indices.indexOf(population_index) !== -1) {
                population_index = get_population_index();
            }
            selected_indices.push(population_index);
            sampled_elements.push(population[population_index]);
        }
        return sampled_elements;
    };

    var starts_with = function (string, sub_string) {
        return string.substr(0, sub_string.length) === sub_string;
    };

    var set_text = function (node, text) {
        if (node.textContent !== undefined){
            node.textContent = text;
        }
        else{
            node.innerText = text;
        }
    };

    // DOM Maniuplation

    var lorem_ipsumify_elements = function (elements) {
        iterate.call(elements, function (element) {
            var settings = convert_data_attributes_to_settings(element);
            lorem_ipsumify_element(element, settings);
        });
    };

    var lorem_ipsumify_element = function (element, settings) {
        switch (settings.mode) {
            case 'words':
                set_text(element, generate_words(
                    settings.words.count,
                    !settings.words.common
                ));
                break;
            case 'sentence':
                set_text(element, generate_sentence());
                break;
            case 'paragraph':
                set_text(element, generate_paragraph());
                break;
            case 'paragraphs':
                var paragraphs = generate_paragraphs(
                    settings.paragraphs.count,
                    !settings.paragraphs.common
                    );
                element.innerHTML = paragraphs.join('<br><br>');
                break;
            case 'children':
                var child_settings = settings.children;
                var child_count = child_settings.count || 3;
                var child_element_name = child_settings.element || 'p';
                for (var index=child_count; index > 0; index -= 1) {
                    var child_element = document.createElement(
                        child_element_name
                    );
                    // TODO: Is this recursion a bad idea?
                    lorem_ipsumify_element(child_element, child_settings);
                    element.appendChild(child_element);
                }
                break;
            default:
                // TODO: Do we want to throw an error here or pass silently
        }
    };

    var convert_data_attributes_to_settings = function (element) {
        var settings = {};
        iterate.call(element.attributes, function (attribute) {
            if (starts_with(attribute.name, DATA_ATTRIBUTE_PREFIX)) {
                var setting_value = attribute.value;
                // If the setting is anything other than a string try to coerce it
                try {
                    setting_value = JSON.parse(setting_value);
                } catch (error) {}

                var unprefixed_attribute_name = attribute.name.substr(
                    DATA_ATTRIBUTE_PREFIX_LENGTH
                );
                var settings_parts = unprefixed_attribute_name.split('-');
                var settings_parts_count = settings_parts.length;
                var local_settings = settings;
                iterate.call(settings_parts, function (setting_name, index) {
                    if (index === settings_parts_count - 1) {
                        // Terminal case
                        local_settings[setting_name] = setting_value;
                    } else {
                        // Non-terminal case
                        if (!(setting_name in local_settings)) {
                            local_settings[setting_name] = {};
                        }
                        local_settings = local_settings[setting_name];
                    }
                });
            }
        });
        return settings;
    };

    
    var run = function () {
        var elements = document.querySelectorAll(
            '[' + DATA_ATTRIBUTE_PREFIX + 'mode]'
        );
        lorem_ipsumify_elements(elements);
    };

    if (window.addEventListener) {
        window.addEventListener('DOMContentLoaded', run);
    } else if (window.attachEvent) {
        document.onreadystatechange = function () {
            if (document.readyState === 'complete') {
                run();
            }
        };
    }

    // Public API

    return {
        paragraph: generate_paragraph,
        paragraphs: generate_paragraphs,
        sentence: generate_sentence,
        words: generate_words
    };

})();
