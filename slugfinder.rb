require 'rubygems'
require 'nokogiri'   

#folder = "vocab"
#filename = %q[%E3%80%9C%E4%BA%BA.html]

def get_vocab_item(page)
	kids = page.css("div.individual-item span.vocabulary-icon span.japanese-font-styling-correction").children
	if kids
		kids[0].content
	else
		nil
	end
end

def get_audio_url(page)
	sources = page.css("audio source")
	if sources
		sources[0]["src"]
	else
		nil
	end
end

AUDIO_RE = /cdn.wanikani.com\/audio\/([0-9a-z]*)\.*/
def get_audio_slug(page)
	url = get_audio_url(page) or return nil
	m = AUDIO_RE.match(url)
	if m
		m[1]
	else
		nil
	end
end

for filename in ARGV
	page = Nokogiri::HTML(open(filename))
	k = get_vocab_item(page)
	v = get_audio_slug(page)
	line = "\"%s\": \"%s\"," % [k, v]
	puts line
end