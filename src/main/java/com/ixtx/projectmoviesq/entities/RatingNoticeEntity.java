package com.ixtx.projectmoviesq.entities;

import java.util.Objects;

public class RatingNoticeEntity {
    private String rating;
    private String title;
    private String content;

    public String getRating() {
        return rating;
    }

    public RatingNoticeEntity setRating(String rating) {
        this.rating = rating;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public RatingNoticeEntity setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getContent() {
        return content;
    }

    public RatingNoticeEntity setContent(String content) {
        this.content = content;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RatingNoticeEntity)) return false;
        RatingNoticeEntity that = (RatingNoticeEntity) o;
        return Objects.equals(rating, that.rating);
    }

    @Override
    public int hashCode() {
        return Objects.hash(rating);
    }
}
