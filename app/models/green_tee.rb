class GreenTee < ApplicationRecord
  belongs_to :place, optional: true
end
