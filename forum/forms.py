from django import forms

from .models import Post


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ("title", "body")
        widgets = {
            "title": forms.TextInput(attrs={"placeholder": "Post title"}),
            "body": forms.Textarea(attrs={"rows": 8, "placeholder": "Write your post..."}),
        }
