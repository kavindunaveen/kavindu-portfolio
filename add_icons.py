import re

file_path = "/Users/kavindunaveen/Desktop/portfolio-kavindu/index.html"
with open(file_path, "r") as f:
    content = f.read()

# Add devicon CDN in the head if not exists
if "devicon.min.css" not in content:
    content = content.replace("</head>", '  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />\n</head>')

# Define mapping of tag text to devicon classes
icon_map = {
    "Python": "devicon-python-plain",
    "Django": "devicon-django-plain",
    "JavaScript": "devicon-javascript-plain",
    "Bootstrap": "devicon-bootstrap-plain",
    "PostgreSQL": "devicon-postgresql-plain",
    "AWS": "devicon-amazonwebservices-plain-wordmark",
    "TypeScript": "devicon-typescript-plain",
    "React": "devicon-react-original",
    "Node.js": "devicon-nodejs-plain",
    "CSS3": "devicon-css3-plain",
    "HTML5": "devicon-html5-plain",
    "WordPress": "devicon-wordpress-plain",
    "WooCommerce": "devicon-woocommerce-plain",
    "PHP": "devicon-php-plain",
    "Firebase": "devicon-firebase-plain",
    "React Native": "devicon-react-original",
}

# Function to replace tech-tag content with icon
def add_icon(match):
    full_tag = match.group(0)
    tag_text = match.group(1).strip()
    
    # Check if we already have an icon (to prevent double replacing if script is run twice)
    if "<i class=" in full_tag:
        return full_tag
        
    icon_class = icon_map.get(tag_text)
    if icon_class:
        return f'<span class="tech-tag"><i class="{icon_class} colored"></i> {tag_text}</span>'
    else:
        # Fallback if no exact match (like SEO, Elementor, REST APIs)
        return full_tag

# Regex to find <span class="tech-tag">TEXT</span>
pattern = re.compile(r'<span class="tech-tag">([^<]+)</span>')
content = pattern.sub(add_icon, content)

with open(file_path, "w") as f:
    f.write(content)

print("Icons added successfully!")
