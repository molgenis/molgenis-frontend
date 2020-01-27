module.exports = {
  links: {
    self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest'
  },
  items: [
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/1'
      },
      data: {
        id: 1,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/1/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/1/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '1985-08-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 1.23,
        xdecimalnillable: 1.23,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum1',
        xenumnillable: 'enum1',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.molgenis.org/',
        xint: 5,
        xintnillable: 1,
        xintrange: 1,
        xintrangenillable: 2,
        xlong: 1,
        xlongnillable: 1,
        xlongrange: 2,
        xlongrangenillable: 2,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/1/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/1/xmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xstring: 'str1',
        xstringnillable: 'str1',
        xtext: 'text',
        xtextnillable: 'text',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xxrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'hidden',
        xstring_unique: 'str1',
        xint_unique: 1,
        xxref_unique: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/5'
          },
          data: {
            Position: 5
          }
        },
        xcomputedint: 5
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/2'
      },
      data: {
        id: 2,
        xbool: false,
        xboolnillable: false,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/2/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/2/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '1985-08-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 4.56,
        xdecimalnillable: 4.56,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum2',
        xenumnillable: 'enum2',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.molgenis.org/',
        xint: 2,
        xintnillable: 2,
        xintrange: 3,
        xintrangenillable: 3,
        xlong: 2,
        xlongnillable: 2,
        xlongrange: 3,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/2/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/2/xmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xstring: 'str2',
        xstringnillable: 'str2',
        xtext: 'very long strong so that we can test if abbreviations are handled correctly by molgenis which is a very cool open source software program',
        xtextnillable: 'very long strong so that we can test if abbreviations are handled correctly by molgenis which is a very cool open source software program',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xxrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'hidden',
        xstring_unique: 'str2',
        xint_unique: 2,
        xxref_unique: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/2'
          },
          data: {
            Position: 2
          }
        },
        xcomputedint: 2
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/3'
      },
      data: {
        id: 3,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/3/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/3/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '2015-04-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 7.89,
        xdecimalnillable: 15.666,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum3',
        xenumnillable: 'enum3',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html 2</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.github.com/',
        xint: 3,
        xintnillable: 1,
        xintrange: 4,
        xintrangenillable: 77,
        xlong: 3,
        xlongnillable: 12342151234,
        xlongrange: 4,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/3/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/3/xmrefnillable_value'
          },
          items: []
        },
        xstring: 'str3',
        xstringnillable: 'xstringnillable',
        xtext: 'text',
        xtextnillable: 'xtextnillable',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'hidden',
        xstring_unique: 'str3',
        xint_unique: 3,
        xxref_unique: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/3'
          },
          data: {
            Position: 3
          }
        },
        xcomputedint: 3
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/4'
      },
      data: {
        id: 4,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/4/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/4/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '1985-08-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 1.23,
        xdecimalnillable: 1.23,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum1',
        xenumnillable: 'enum1',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.molgenis.org/',
        xint: 1,
        xintnillable: 1,
        xintrange: 2,
        xintrangenillable: 2,
        xlong: 1,
        xlongnillable: 1,
        xlongrange: 2,
        xlongrangenillable: 2,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/4/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/4/xmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xstring: 'str1',
        xstringnillable: 'str1',
        xtext: 'text',
        xtextnillable: 'text',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xxrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'hidden',
        xstring_unique: 'str4',
        xint_unique: 4,
        xxref_unique: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref4'
          },
          data: {
            label: 'label4'
          }
        },
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/1'
          },
          data: {
            Position: 1
          }
        },
        xcomputedint: 1
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/5'
      },
      data: {
        id: 5,
        xbool: false,
        xboolnillable: false,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/5/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/5/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '1985-08-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 4.56,
        xdecimalnillable: 4.56,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum2',
        xenumnillable: 'enum2',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.molgenis.org/',
        xint: 2,
        xintnillable: 2,
        xintrange: 3,
        xintrangenillable: 3,
        xlong: 2,
        xlongnillable: 2,
        xlongrange: 3,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/5/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/5/xmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xstring: 'str2',
        xstringnillable: 'str2',
        xtext: 'very long strong so that we can test if abbreviations are handled correctly by molgenis which is a very cool open source software program',
        xtextnillable: 'very long strong so that we can test if abbreviations are handled correctly by molgenis which is a very cool open source software program',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xxrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'hidden',
        xstring_unique: 'str5',
        xint_unique: 5,
        xxref_unique: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref5'
          },
          data: {
            label: 'label5'
          }
        },
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/2'
          },
          data: {
            Position: 2
          }
        },
        xcomputedint: 2
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/6'
      },
      data: {
        id: 6,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/6/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/6/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '2015-04-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 7.89,
        xdecimalnillable: 15.666,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum3',
        xenumnillable: 'enum3',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html 2</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.github.com/',
        xint: 3,
        xintnillable: 1,
        xintrange: 4,
        xintrangenillable: 77,
        xlong: 3,
        xlongnillable: 12342151234,
        xlongrange: 4,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/6/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/6/xmrefnillable_value'
          },
          items: []
        },
        xstring: 'str3',
        xstringnillable: 'xstringnillable',
        xtext: 'text',
        xtextnillable: 'xtextnillable',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'hidden',
        xstring_unique: 'str6',
        xint_unique: 6,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/3'
          },
          data: {
            Position: 3
          }
        },
        xcomputedint: 3
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/7'
      },
      data: {
        id: 7,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/7/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/7/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '1985-08-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 1.23,
        xdecimalnillable: 1.23,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum1',
        xenumnillable: 'enum1',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.molgenis.org/',
        xint: 1,
        xintnillable: 1,
        xintrange: 2,
        xintrangenillable: 2,
        xlong: 1,
        xlongnillable: 1,
        xlongrange: 2,
        xlongrangenillable: 2,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/7/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/7/xmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xstring: 'str1',
        xstringnillable: 'str1',
        xtext: 'text',
        xtextnillable: 'text',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xxrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'hidden',
        xstring_unique: 'str7',
        xint_unique: 7,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/1'
          },
          data: {
            Position: 1
          }
        },
        xcomputedint: 1
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/8'
      },
      data: {
        id: 8,
        xbool: false,
        xboolnillable: false,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/8/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/8/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '1985-08-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 4.56,
        xdecimalnillable: 4.56,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum2',
        xenumnillable: 'enum2',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.molgenis.org/',
        xint: 2,
        xintnillable: 2,
        xintrange: 3,
        xintrangenillable: 3,
        xlong: 2,
        xlongnillable: 2,
        xlongrange: 3,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/8/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/8/xmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xstring: 'str2',
        xstringnillable: 'str2',
        xtext: 'very long strong so that we can test if abbreviations are handled correctly by molgenis which is a very cool open source software program',
        xtextnillable: 'very long strong so that we can test if abbreviations are handled correctly by molgenis which is a very cool open source software program',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xxrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'hidden',
        xstring_unique: 'str8',
        xint_unique: 8,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/2'
          },
          data: {
            Position: 2
          }
        },
        xcomputedint: 2
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/9'
      },
      data: {
        id: 9,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/9/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/9/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '2015-04-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 7.89,
        xdecimalnillable: 15.666,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum3',
        xenumnillable: 'enum3',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html 2</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.github.com/',
        xint: 3,
        xintnillable: 1,
        xintrange: 4,
        xintrangenillable: 77,
        xlong: 3,
        xlongnillable: 12342151234,
        xlongrange: 4,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/9/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/9/xmrefnillable_value'
          },
          items: []
        },
        xstring: 'str3',
        xstringnillable: 'xstringnillable',
        xtext: 'text',
        xtextnillable: 'xtextnillable',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'hidden',
        xstring_unique: 'str9',
        xint_unique: 9,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/3'
          },
          data: {
            Position: 3
          }
        },
        xcomputedint: 3
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/10'
      },
      data: {
        id: 10,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/10/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/10/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '1985-08-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 1.23,
        xdecimalnillable: 1.23,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum1',
        xenumnillable: 'enum1',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.molgenis.org/',
        xint: 1,
        xintnillable: 1,
        xintrange: 2,
        xintrangenillable: 2,
        xlong: 1,
        xlongnillable: 1,
        xlongrange: 2,
        xlongrangenillable: 2,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/10/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/10/xmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xstring: 'str1',
        xstringnillable: 'str1',
        xtext: 'text',
        xtextnillable: 'text',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xxrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'hidden',
        xstring_unique: 'str10',
        xint_unique: 10,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/1'
          },
          data: {
            Position: 1
          }
        },
        xcomputedint: 1
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/11'
      },
      data: {
        id: 11,
        xbool: false,
        xboolnillable: false,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/11/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/11/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '1985-08-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 4.56,
        xdecimalnillable: 4.56,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum2',
        xenumnillable: 'enum2',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.molgenis.org/',
        xint: 2,
        xintnillable: 2,
        xintrange: 3,
        xintrangenillable: 3,
        xlong: 2,
        xlongnillable: 2,
        xlongrange: 3,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/11/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/11/xmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xstring: 'str2',
        xstringnillable: 'str2',
        xtext: 'very long strong so that we can test if abbreviations are handled correctly by molgenis which is a very cool open source software program',
        xtextnillable: 'very long strong so that we can test if abbreviations are handled correctly by molgenis which is a very cool open source software program',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xxrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'hidden',
        xstring_unique: 'str11',
        xint_unique: 11,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/2'
          },
          data: {
            Position: 2
          }
        },
        xcomputedint: 2
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/12'
      },
      data: {
        id: 12,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/12/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/12/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '2015-04-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 7.89,
        xdecimalnillable: 15.666,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum3',
        xenumnillable: 'enum3',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html 2</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.github.com/',
        xint: 3,
        xintnillable: 1,
        xintrange: 4,
        xintrangenillable: 77,
        xlong: 3,
        xlongnillable: 12342151234,
        xlongrange: 4,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/12/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/12/xmrefnillable_value'
          },
          items: []
        },
        xstring: 'str3',
        xstringnillable: 'xstringnillable',
        xtext: 'text',
        xtextnillable: 'xtextnillable',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'hidden',
        xstring_unique: 'str12',
        xint_unique: 12,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/3'
          },
          data: {
            Position: 3
          }
        },
        xcomputedint: 3
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/13'
      },
      data: {
        id: 13,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/13/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/13/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '1985-08-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 1.23,
        xdecimalnillable: 1.23,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum1',
        xenumnillable: 'enum1',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.molgenis.org/',
        xint: 1,
        xintnillable: 1,
        xintrange: 2,
        xintrangenillable: 2,
        xlong: 1,
        xlongnillable: 1,
        xlongrange: 2,
        xlongrangenillable: 2,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/13/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/13/xmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xstring: 'str1',
        xstringnillable: 'str1',
        xtext: 'text',
        xtextnillable: 'text',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xxrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'hidden',
        xstring_unique: 'str13',
        xint_unique: 13,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/1'
          },
          data: {
            Position: 1
          }
        },
        xcomputedint: 1
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/14'
      },
      data: {
        id: 14,
        xbool: false,
        xboolnillable: false,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/14/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/14/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '1985-08-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 4.56,
        xdecimalnillable: 4.56,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum2',
        xenumnillable: 'enum2',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.molgenis.org/',
        xint: 2,
        xintnillable: 2,
        xintrange: 3,
        xintrangenillable: 3,
        xlong: 2,
        xlongnillable: 2,
        xlongrange: 3,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/14/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/14/xmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xstring: 'str2',
        xstringnillable: 'str2',
        xtext: 'very long strong so that we can test if abbreviations are handled correctly by molgenis which is a very cool open source software program',
        xtextnillable: 'very long strong so that we can test if abbreviations are handled correctly by molgenis which is a very cool open source software program',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xxrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'hidden',
        xstring_unique: 'str14',
        xint_unique: 14,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/2'
          },
          data: {
            Position: 2
          }
        },
        xcomputedint: 2
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/15'
      },
      data: {
        id: 15,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/15/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/15/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '2015-04-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 7.89,
        xdecimalnillable: 15.666,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum3',
        xenumnillable: 'enum3',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html 2</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.github.com/',
        xint: 3,
        xintnillable: 1,
        xintrange: 4,
        xintrangenillable: 77,
        xlong: 3,
        xlongnillable: 12342151234,
        xlongrange: 4,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/15/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/15/xmrefnillable_value'
          },
          items: []
        },
        xstring: 'str3',
        xstringnillable: 'xstringnillable',
        xtext: 'text',
        xtextnillable: 'xtextnillable',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'hidden',
        xstring_unique: 'str15',
        xint_unique: 15,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/3'
          },
          data: {
            Position: 3
          }
        },
        xcomputedint: 3
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/16'
      },
      data: {
        id: 16,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/16/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/16/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '2015-04-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 7.89,
        xdecimalnillable: 15.666,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum1',
        xenumnillable: 'enum3',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html 2</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.github.com/',
        xint: 3,
        xintnillable: 1,
        xintrange: 4,
        xintrangenillable: 77,
        xlong: 3,
        xlongnillable: 12342151234,
        xlongrange: 4,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/16/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/16/xmrefnillable_value'
          },
          items: []
        },
        xstring: 'str3',
        xstringnillable: 'xstringnillable',
        xtext: 'text',
        xtextnillable: 'xtextnillable',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'hidden',
        xstring_unique: 'str16',
        xint_unique: 16,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/3'
          },
          data: {
            Position: 3
          }
        },
        xcomputedint: 3
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/17'
      },
      data: {
        id: 17,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/17/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/17/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '1985-08-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 1.23,
        xdecimalnillable: 1.23,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum2',
        xenumnillable: 'enum1',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.molgenis.org/',
        xint: 1,
        xintnillable: 1,
        xintrange: 2,
        xintrangenillable: 2,
        xlong: 1,
        xlongnillable: 1,
        xlongrange: 2,
        xlongrangenillable: 2,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/17/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/17/xmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xstring: 'str1',
        xstringnillable: 'str1',
        xtext: 'text',
        xtextnillable: 'text',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xxrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'hidden',
        xstring_unique: 'str17',
        xint_unique: 17,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/1'
          },
          data: {
            Position: 1
          }
        },
        xcomputedint: 1
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/18'
      },
      data: {
        id: 18,
        xbool: false,
        xboolnillable: false,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/18/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/18/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '1985-08-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 4.56,
        xdecimalnillable: 4.56,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum3',
        xenumnillable: 'enum2',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.molgenis.org/',
        xint: 2,
        xintnillable: 2,
        xintrange: 3,
        xintrangenillable: 3,
        xlong: 2,
        xlongnillable: 2,
        xlongrange: 3,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/18/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/18/xmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xstring: 'str2',
        xstringnillable: 'str2',
        xtext: 'very long strong so that we can test if abbreviations are handled correctly by molgenis which is a very cool open source software program',
        xtextnillable: 'very long strong so that we can test if abbreviations are handled correctly by molgenis which is a very cool open source software program',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xxrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'hidden',
        xstring_unique: 'str18',
        xint_unique: 18,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/2'
          },
          data: {
            Position: 2
          }
        },
        xcomputedint: 2
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/19'
      },
      data: {
        id: 19,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/19/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/19/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '2015-04-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 7.89,
        xdecimalnillable: 15.666,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum1',
        xenumnillable: 'enum3',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html 2</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.github.com/',
        xint: 3,
        xintnillable: 1,
        xintrange: 4,
        xintrangenillable: 77,
        xlong: 3,
        xlongnillable: 12342151234,
        xlongrange: 4,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/19/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/19/xmrefnillable_value'
          },
          items: []
        },
        xstring: 'str3',
        xstringnillable: 'xstringnillable',
        xtext: 'text',
        xtextnillable: 'xtextnillable',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'hidden',
        xstring_unique: 'str19',
        xint_unique: 19,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/3'
          },
          data: {
            Position: 3
          }
        },
        xcomputedint: 3
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/20'
      },
      data: {
        id: 20,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/20/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/20/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '1985-08-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 1.23,
        xdecimalnillable: 1.23,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum2',
        xenumnillable: 'enum1',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.molgenis.org/',
        xint: 1,
        xintnillable: 1,
        xintrange: 2,
        xintrangenillable: 2,
        xlong: 1,
        xlongnillable: 1,
        xlongrange: 2,
        xlongrangenillable: 2,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/20/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/20/xmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xstring: 'str1',
        xstringnillable: 'str1',
        xtext: 'text',
        xtextnillable: 'text',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xxrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'hidden',
        xstring_unique: 'str20',
        xint_unique: 20,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/1'
          },
          data: {
            Position: 1
          }
        },
        xcomputedint: 1
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/21'
      },
      data: {
        id: 21,
        xbool: false,
        xboolnillable: false,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/21/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/21/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '1985-08-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 4.56,
        xdecimalnillable: 4.56,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum3',
        xenumnillable: 'enum2',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.molgenis.org/',
        xint: 2,
        xintnillable: 2,
        xintrange: 3,
        xintrangenillable: 3,
        xlong: 2,
        xlongnillable: 2,
        xlongrange: 3,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/21/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/21/xmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xstring: 'str2',
        xstringnillable: 'str2',
        xtext: 'very long strong so that we can test if abbreviations are handled correctly by molgenis which is a very cool open source software program',
        xtextnillable: 'very long strong so that we can test if abbreviations are handled correctly by molgenis which is a very cool open source software program',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xxrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'xstringhidden',
        xstring_unique: 'str21',
        xint_unique: 21,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/2'
          },
          data: {
            Position: 2
          }
        },
        xcomputedint: 2
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/22'
      },
      data: {
        id: 22,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/22/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/22/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '2015-04-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 7.89,
        xdecimalnillable: 15.666,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum1',
        xenumnillable: 'enum3',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html 2</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.github.com/',
        xint: 3,
        xintnillable: 1,
        xintrange: 4,
        xintrangenillable: 77,
        xlong: 3,
        xlongnillable: 12342151234,
        xlongrange: 4,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/22/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/22/xmrefnillable_value'
          },
          items: []
        },
        xstring: 'str3',
        xstringnillable: 'xstringnillable',
        xtext: 'text',
        xtextnillable: 'xtextnillable',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'xstringhidden',
        xstring_unique: 'str22',
        xint_unique: 22,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/3'
          },
          data: {
            Position: 3
          }
        },
        xcomputedint: 3
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/23'
      },
      data: {
        id: 23,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/23/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/23/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '1985-08-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 1.23,
        xdecimalnillable: 1.23,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum2',
        xenumnillable: 'enum1',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.molgenis.org/',
        xint: 1,
        xintnillable: 1,
        xintrange: 2,
        xintrangenillable: 2,
        xlong: 1,
        xlongnillable: 1,
        xlongrange: 2,
        xlongrangenillable: 2,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/23/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/23/xmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xstring: 'str1',
        xstringnillable: 'str1',
        xtext: 'text',
        xtextnillable: 'text',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xxrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'xstringhidden',
        xstring_unique: 'str23',
        xint_unique: 23,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/1'
          },
          data: {
            Position: 1
          }
        },
        xcomputedint: 1
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/24'
      },
      data: {
        id: 24,
        xbool: false,
        xboolnillable: false,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/24/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/24/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '1985-08-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 4.56,
        xdecimalnillable: 4.56,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum3',
        xenumnillable: 'enum2',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.molgenis.org/',
        xint: 2,
        xintnillable: 2,
        xintrange: 3,
        xintrangenillable: 3,
        xlong: 2,
        xlongnillable: 2,
        xlongrange: 3,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/24/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/24/xmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xstring: 'str2',
        xstringnillable: 'str2',
        xtext: 'very long strong so that we can test if abbreviations are handled correctly by molgenis which is a very cool open source software program',
        xtextnillable: 'very long strong so that we can test if abbreviations are handled correctly by molgenis which is a very cool open source software program',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xxrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'xstringhidden',
        xstring_unique: 'str24',
        xint_unique: 24,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/2'
          },
          data: {
            Position: 2
          }
        },
        xcomputedint: 2
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/25'
      },
      data: {
        id: 25,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/25/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/25/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '2015-04-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 7.89,
        xdecimalnillable: 15.666,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum1',
        xenumnillable: 'enum3',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html 2</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.github.com/',
        xint: 3,
        xintnillable: 1,
        xintrange: 4,
        xintrangenillable: 77,
        xlong: 3,
        xlongnillable: 12342151234,
        xlongrange: 4,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/25/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/25/xmrefnillable_value'
          },
          items: []
        },
        xstring: 'str3',
        xstringnillable: 'xstringnillable',
        xtext: 'text',
        xtextnillable: 'xtextnillable',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'xstringhidden',
        xstring_unique: 'str25',
        xint_unique: 25,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/3'
          },
          data: {
            Position: 3
          }
        },
        xcomputedint: 3
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/26'
      },
      data: {
        id: 26,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/26/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/26/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '1985-08-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 1.23,
        xdecimalnillable: 1.23,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum2',
        xenumnillable: 'enum1',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.molgenis.org/',
        xint: 1,
        xintnillable: 1,
        xintrange: 2,
        xintrangenillable: 2,
        xlong: 1,
        xlongnillable: 1,
        xlongrange: 2,
        xlongrangenillable: 2,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/26/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/26/xmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xstring: 'str1',
        xstringnillable: 'str1',
        xtext: 'text',
        xtextnillable: 'text',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xxrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'xstringhidden',
        xstring_unique: 'str26',
        xint_unique: 26,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/1'
          },
          data: {
            Position: 1
          }
        },
        xcomputedint: 1
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/27'
      },
      data: {
        id: 27,
        xbool: false,
        xboolnillable: false,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/27/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/27/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '1985-08-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 4.56,
        xdecimalnillable: 4.56,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum3',
        xenumnillable: 'enum2',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.molgenis.org/',
        xint: 2,
        xintnillable: 2,
        xintrange: 3,
        xintrangenillable: 3,
        xlong: 2,
        xlongnillable: 2,
        xlongrange: 3,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/27/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/27/xmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xstring: 'str2',
        xstringnillable: 'str2',
        xtext: 'very long strong so that we can test if abbreviations are handled correctly by molgenis which is a very cool open source software program',
        xtextnillable: 'very long strong so that we can test if abbreviations are handled correctly by molgenis which is a very cool open source software program',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xxrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'xstringhidden',
        xstring_unique: 'str27',
        xint_unique: 27,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/2'
          },
          data: {
            Position: 2
          }
        },
        xcomputedint: 2
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/28'
      },
      data: {
        id: 28,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/28/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/28/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '2015-04-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 7.89,
        xdecimalnillable: 15.666,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum1',
        xenumnillable: 'enum3',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html 2</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.github.com/',
        xint: 3,
        xintnillable: 1,
        xintrange: 4,
        xintrangenillable: 77,
        xlong: 3,
        xlongnillable: 12342151234,
        xlongrange: 4,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/28/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/28/xmrefnillable_value'
          },
          items: []
        },
        xstring: 'str3',
        xstringnillable: 'xstringnillable',
        xtext: 'text',
        xtextnillable: 'xtextnillable',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'xstringhidden',
        xstring_unique: 'str28',
        xint_unique: 28,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/3'
          },
          data: {
            Position: 3
          }
        },
        xcomputedint: 3
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/29'
      },
      data: {
        id: 29,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/29/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/29/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '1985-08-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 1.23,
        xdecimalnillable: 1.23,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum2',
        xenumnillable: 'enum1',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.molgenis.org/',
        xint: 1,
        xintnillable: 1,
        xintrange: 2,
        xintrangenillable: 2,
        xlong: 1,
        xlongnillable: 1,
        xlongrange: 2,
        xlongrangenillable: 2,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/29/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/29/xmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xstring: 'str1',
        xstringnillable: 'str1',
        xtext: 'text',
        xtextnillable: 'text',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xxrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'xstringhidden',
        xstring_unique: 'str29',
        xint_unique: 29,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/1'
          },
          data: {
            Position: 1
          }
        },
        xcomputedint: 1
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/30'
      },
      data: {
        id: 30,
        xbool: false,
        xboolnillable: false,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/30/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/30/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '1985-08-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 4.56,
        xdecimalnillable: 4.56,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum3',
        xenumnillable: 'enum2',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.molgenis.org/',
        xint: 2,
        xintnillable: 2,
        xintrange: 3,
        xintrangenillable: 3,
        xlong: 2,
        xlongnillable: 2,
        xlongrange: 3,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/30/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/30/xmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xstring: 'str2',
        xstringnillable: 'str2',
        xtext: 'very long strong so that we can test if abbreviations are handled correctly by molgenis which is a very cool open source software program',
        xtextnillable: 'very long strong so that we can test if abbreviations are handled correctly by molgenis which is a very cool open source software program',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xxrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'xstringhidden',
        xstring_unique: 'str30',
        xint_unique: 30,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/2'
          },
          data: {
            Position: 2
          }
        },
        xcomputedint: 2
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/31'
      },
      data: {
        id: 31,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/31/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/31/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '2015-04-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 7.89,
        xdecimalnillable: 15.666,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum1',
        xenumnillable: 'enum3',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html 2</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.github.com/',
        xint: 3,
        xintnillable: 1,
        xintrange: 4,
        xintrangenillable: 77,
        xlong: 3,
        xlongnillable: 12342151234,
        xlongrange: 4,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/31/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/31/xmrefnillable_value'
          },
          items: []
        },
        xstring: 'str3',
        xstringnillable: 'xstringnillable',
        xtext: 'text',
        xtextnillable: 'xtextnillable',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'xstringhidden',
        xstring_unique: 'str31',
        xint_unique: 31,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/3'
          },
          data: {
            Position: 3
          }
        },
        xcomputedint: 3
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/32'
      },
      data: {
        id: 32,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/32/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/32/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '1985-08-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 1.23,
        xdecimalnillable: 1.23,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum2',
        xenumnillable: 'enum1',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.molgenis.org/',
        xint: 1,
        xintnillable: 1,
        xintrange: 2,
        xintrangenillable: 2,
        xlong: 1,
        xlongnillable: 1,
        xlongrange: 2,
        xlongrangenillable: 2,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/32/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/32/xmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xstring: 'str1',
        xstringnillable: 'str1',
        xtext: 'text',
        xtextnillable: 'text',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xxrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'xstringhidden',
        xstring_unique: 'str32',
        xint_unique: 32,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/1'
          },
          data: {
            Position: 1
          }
        },
        xcomputedint: 1
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/33'
      },
      data: {
        id: 33,
        xbool: false,
        xboolnillable: false,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/33/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/33/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '1985-08-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 4.56,
        xdecimalnillable: 4.56,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum3',
        xenumnillable: 'enum2',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.molgenis.org/',
        xint: 2,
        xintnillable: 2,
        xintrange: 3,
        xintrangenillable: 3,
        xlong: 2,
        xlongnillable: 2,
        xlongrange: 3,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/33/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/33/xmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xstring: 'str2',
        xstringnillable: 'str2',
        xtext: 'very long strong so that we can test if abbreviations are handled correctly by molgenis which is a very cool open source software program',
        xtextnillable: 'very long strong so that we can test if abbreviations are handled correctly by molgenis which is a very cool open source software program',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xxrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'xstringhidden',
        xstring_unique: 'str33',
        xint_unique: 33,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/2'
          },
          data: {
            Position: 2
          }
        },
        xcomputedint: 2
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/34'
      },
      data: {
        id: 34,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/34/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/34/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '2015-04-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 7.89,
        xdecimalnillable: 15.666,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum1',
        xenumnillable: 'enum3',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html 2</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.github.com/',
        xint: 3,
        xintnillable: 1,
        xintrange: 4,
        xintrangenillable: 77,
        xlong: 3,
        xlongnillable: 12342151234,
        xlongrange: 4,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/34/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/34/xmrefnillable_value'
          },
          items: []
        },
        xstring: 'str3',
        xstringnillable: 'xstringnillable',
        xtext: 'text',
        xtextnillable: 'xtextnillable',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'xstringhidden',
        xstring_unique: 'str34',
        xint_unique: 34,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/3'
          },
          data: {
            Position: 3
          }
        },
        xcomputedint: 3
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/35'
      },
      data: {
        id: 35,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/35/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/35/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '2015-04-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 7.89,
        xdecimalnillable: 15.666,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum2',
        xenumnillable: 'enum3',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html 2</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.github.com/',
        xint: 3,
        xintnillable: 1,
        xintrange: 4,
        xintrangenillable: 77,
        xlong: 3,
        xlongnillable: 12342151234,
        xlongrange: 4,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/35/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/35/xmrefnillable_value'
          },
          items: []
        },
        xstring: 'str3',
        xstringnillable: 'xstringnillable',
        xtext: 'text',
        xtextnillable: 'xtextnillable',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'xstringhidden',
        xstring_unique: 'str35',
        xint_unique: 35,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/3'
          },
          data: {
            Position: 3
          }
        },
        xcomputedint: 3
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/36'
      },
      data: {
        id: 36,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/36/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/36/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '1985-08-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 1.23,
        xdecimalnillable: 1.23,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum3',
        xenumnillable: 'enum1',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.molgenis.org/',
        xint: 1,
        xintnillable: 1,
        xintrange: 2,
        xintrangenillable: 2,
        xlong: 1,
        xlongnillable: 1,
        xlongrange: 2,
        xlongrangenillable: 2,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/36/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/36/xmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            }
          ]
        },
        xstring: 'str1',
        xstringnillable: 'str1',
        xtext: 'text',
        xtextnillable: 'text',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xxrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
          },
          data: {
            label: 'label1'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'xstringhidden',
        xstring_unique: 'str36',
        xint_unique: 36,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/1'
          },
          data: {
            Position: 1
          }
        },
        xcomputedint: 1
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/37'
      },
      data: {
        id: 37,
        xbool: false,
        xboolnillable: false,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/37/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/37/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '1985-08-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 4.56,
        xdecimalnillable: 4.56,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum1',
        xenumnillable: 'enum2',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.molgenis.org/',
        xint: 2,
        xintnillable: 2,
        xintrange: 3,
        xintrangenillable: 3,
        xlong: 2,
        xlongnillable: 2,
        xlongrange: 3,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/37/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/37/xmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xstring: 'str2',
        xstringnillable: 'str2',
        xtext: 'very long strong so that we can test if abbreviations are handled correctly by molgenis which is a very cool open source software program',
        xtextnillable: 'very long strong so that we can test if abbreviations are handled correctly by molgenis which is a very cool open source software program',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xxrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'xstringhidden',
        xstring_unique: 'str37',
        xint_unique: 37,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/2'
          },
          data: {
            Position: 2
          }
        },
        xcomputedint: 2
      }
    },
    {
      links: {
        self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/38'
      },
      data: {
        id: 38,
        xbool: true,
        xboolnillable: true,
        xcategorical_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xcategoricalnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
          },
          data: {
            label: 'label2'
          }
        },
        xcategoricalmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/38/xcategoricalmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xcatmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/38/xcatmrefnillable_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xdate: '1985-08-01',
        xdatenillable: '2015-04-01',
        xdatetime: '1985-08-12T06:12:13Z',
        xdatetimenillable: '1985-08-12T06:12:13Z',
        xdecimal: 7.89,
        xdecimalnillable: 15.666,
        xemail: 'molgenis@gmail.com',
        xemailnillable: 'molgenis@gmail.com',
        xenum: 'enum2',
        xenumnillable: 'enum3',
        xhtml: '<h1>html</h1>',
        xhtmlnillable: '<h1>html 2</h1>',
        xhyperlink: 'http://www.molgenis.org/',
        xhyperlinknillable: 'http://www.github.com/',
        xint: 1,
        xintnillable: 1,
        xintrange: 4,
        xintrangenillable: 77,
        xlong: 3,
        xlongnillable: 12342151234,
        xlongrange: 4,
        xlongrangenillable: 3,
        xmref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/38/xmref_value'
          },
          items: [
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref1'
              },
              data: {
                label: 'label1'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref2'
              },
              data: {
                label: 'label2'
              }
            },
            {
              links: {
                self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
              },
              data: {
                label: 'label3'
              }
            }
          ]
        },
        xmrefnillable_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTest/38/xmrefnillable_value'
          },
          items: []
        },
        xstring: 'str3',
        xstringnillable: 'xstringnillable',
        xtext: 'text',
        xtextnillable: 'xtextnillable',
        xxref_value: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_TypeTestRef/ref3'
          },
          data: {
            label: 'label3'
          }
        },
        xstring_hidden: 'hidden',
        xstringnillable_hidden: 'xstringhidden',
        xstring_unique: 'str38',
        xint_unique: 38,
        xcomputedxref: {
          links: {
            self: 'http://localhost:443/api/data/it_emx_datatypes_Location/1'
          },
          data: {
            Position: 1
          }
        },
        xcomputedint: 1
      }
    }
  ],
  page: {
    size: 38,
    totalElements: 38,
    totalPages: 1,
    number: 0
  }
}
